const Category = require("../models/Category");
const { populate } = require("../models/User");

function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}

exports.createCategory = async (req, res) => {
    try {
        //fetch data
        const { name, desc } = req.body;
        //validation
        if (!name || !desc) {
            return res.json({
                success: false,
                message: "Please fill the required field",
            })
        }
        //entry in db
        const CategoryCreated = await Category.create({
            name: name,
            description: desc,
        })
        console.log("Category Created: ", CategoryCreated);
        return res.status(200).json({
            success: true,
            message: "Category Created Successfully",
        })
    } catch (err) {
        console.log("Error : ");
        return res.json({
            success: false,
            message: "Unable to create Category"
        })
    }
}

exports.getAllCategory = async (req, res) => {
    try {
        const allCategory = await Category.find({}, { name: true });
        if (allCategory.length === 0) {
            return res.json({
                success: false,
                message: "No Category found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Category found",
            allCategory,
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Unable to fetch all the Category"
        })
    }
}

//get Category Page Details
exports.categoryPageDetails = async (req, res) => {
    try {
        const { categoryId } = req.body

        // console.log("Category Id", catId);

        // console.log("PRINTING CATEGORY ID: ", categoryId);
        // Get courses for the specified category
        const selectedCategory = await Category.findById(categoryId)
            .populate({
                path: "courses",
                match : {status : "Published"},
                populate : [
                    {
                        path: "instructor"
                    },
                    {
                        path: "ratingAndReviews"
                    }
                ]
            })
            .exec()

        // console.log("SELECTED COURSE", selectedCategory?.courses)
        // Handle the case when the category is not found
        if (!selectedCategory) {
            console.log("Category not found.")
            return res
                .status(404)
                .json({ success: false, message: "Category not found" })
        }

        // Get courses for other categories
        const categoriesExceptSelected = await Category.find({
            _id: { $ne: categoryId },
        })

        const differentCategory = await Category.findById(
            categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]._id
        )
            .populate({
                path: 'courses',
                match : {status : "Published"},
                populate : [
                    {
                        path: "instructor"
                    },
                    {
                        path: "ratingAndReviews"
                    }
                ]
            })
            .exec();

        // Filter the courses to include only those with status "Published"
        if (differentCategory) {
            differentCategory.courses = differentCategory.courses.filter(course => course.status === 'Published');
        }

        // console.log(differentCategory);

        // console.log("Different COURSE", differentCategory)
        // Get top-selling courses across all categories
        const allCategories = await Category.find()
            .populate({
                path: "courses",
                match : {status : "Published"},
                populate : [
                    {
                        path: "instructor"
                    },
                    {
                        path: "ratingAndReviews"
                    }
                ]
            })
            .exec();

        const allCourses = allCategories.flatMap((category) => category.courses)
        const mostSellingCourses = allCourses
            .sort((a, b) => b.sold - a.sold)
            .slice(0, 10)
        // console.log("mostSellingCourses COURSE", mostSellingCourses)
        return res.status(200).json({
            success: true,
            data: {
                selectedCategory,
                differentCategory,
                mostSellingCourses,
            },
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        })
    }
}