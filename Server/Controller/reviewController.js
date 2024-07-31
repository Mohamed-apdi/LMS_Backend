import Joi from "joi"
import Review from "../Model/ReviewModel.js"

const reviewSchema = Joi.object({
    rating:Joi.number().min(1).max(5),
    comment: Joi.string(),
    course: Joi.string().required(),
})

export async function createReview (req,res){
    try {
        const { body,user} = req
        const { error,value } = reviewSchema.validate(body)

        if(error) return res.status(400).json({message:error.details[0].message})
        
        const { rating,comment,course } = value

        const data = {
            rating,
            comment,
            course,
            user:user._id
        }
        
        const review = new Review(data)
        await review.save()

        res.status(201).json(review)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}