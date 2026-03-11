const XLSX = require("xlsx");
const Product = require("../models/product");

exports.uploadProducts = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(sheet);

        if (data.length === 0) {
            return res.status(400).json({ message: "Excel file is empty" });
        }

        const validProducts = [];
        const errors = [];

        data.forEach((row, index) => {
            const { name, brand, category, subcategory, price, originalPrice, description, image, stock, rating } = row;

            // Simple validation for required fields
            if (!name || !brand || !category || !price || !image) {
                errors.push(`Row ${index + 2}: Missing required fields (name, brand, category, price, image)`);
                return;
            }

            const parsedPrice = parseFloat(price);
            const parsedOriginalPrice = parseFloat(originalPrice) || parsedPrice;
            const parsedStock = parseInt(stock);
            const parsedRating = parseFloat(rating);

            if (isNaN(parsedPrice)) {
                errors.push(`Row ${index + 2}: Invalid price`);
                return;
            }

            validProducts.push({
                name,
                brand,
                category,
                subcategory: subcategory || "General",
                type: subcategory || "General", // Legacy support
                price: parsedPrice,
                originalPrice: isNaN(parsedOriginalPrice) ? parsedPrice : parsedOriginalPrice,
                description: description || "",
                image,
                stock: isNaN(parsedStock) ? 10 : parsedStock,
                rating: isNaN(parsedRating) ? 4 : parsedRating
            });
        });


        if (validProducts.length === 0) {
            return res.status(400).json({ message: "No valid products found in file", errors });
        }

        await Product.insertMany(validProducts);

        res.status(200).json({
            message: "Bulk upload successful",
            count: validProducts.length,
            errors: errors.length > 0 ? errors : null
        });

    } catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({ message: "Server error during upload", error: error.message });
    }
};
