const Category = require("../Models/Category");

function getRandomInt(max) {
    return max > 0 ? Math.floor(Math.random() * max) : 0;
}

exports.createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const categoryDetails = await Category.create({
            name: name,
            description: description,
        });

        console.log("Category Created:", categoryDetails);
        return res.status(200).json({
            success: true,
            message: "Category Created Successfully",
            data: categoryDetails
        });

    } catch (error) {
        console.error("Error creating category:", error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.showAllCategories = async (req, res) => {
    try {
        console.log("Fetching All Categories...");
        const allCategories = await Category.find({});
        return res.status(200).json({
            success: true,
            data: allCategories,
        });

    } catch (error) {
        console.error("Error fetching categories:", error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Fetch category details and top-selling courses
exports.categoryPageDetails = async (req, res) => {
  try {
      const { categoryId } = req.body;
      console.log("PRINTING CATEGORY ID: ", categoryId);

      // Get courses for the specified category
      const selectedCategory = await Category.findById(categoryId)
          .populate({
              path: "course",  // ✅ Corrected from "courses" to "course"
              match: { status: "Published" },
              populate: { path: "ratingAndReviews" },
          })
          .exec();

      if (!selectedCategory) {
          console.log("Category not found.");
          return res.status(404).json({ success: false, message: "Category not found" });
      }

      if (selectedCategory.course.length === 0) {
          console.log("No courses found for the selected category.");
          return res.status(404).json({ success: false, message: "No courses found for the selected category." });
      }

      // Get courses for other categories
      const categoriesExceptSelected = await Category.find({ _id: { $ne: categoryId } });

      let differentCategory = await Category.findById(
          categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]?._id
      )
          .populate({
              path: "course", // ✅ Corrected
              match: { status: "Published" },
          })
          .exec();

      // Get top-selling courses across all categories
      const allCategories = await Category.find()
          .populate({
              path: "course", // ✅ Corrected
              match: { status: "Published" },
              populate: { path: "instructor" },
          })
          .exec();

      const allCourses = allCategories.flatMap((category) => category.course);
      const mostSellingCourses = allCourses
          .sort((a, b) => b.sold - a.sold)
          .slice(0, 10);

      res.status(200).json({
          success: true,
          data: {
              selectedCategory,
              differentCategory,
              mostSellingCourses,
          },
      });
  } catch (error) {
      return res.status(500).json({
          success: false,
          message: "Internal server error",
          error: error.message,
      });
  }
};
