import express from "express"
import cors from "cors"
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { DB_Connect } from "./Config/DB_Connect.js";
import { authRoute } from "./Router/UserRoute.js";
import { errorHandler, notFound } from "./Middleware/errorHandler.js";
import { courseRouter } from "./Router/CourseRoute.js";
import { enrollRoute } from "./Router/EnrollmentRoute.js";
import { wishlistRouet } from "./Router/WishlistRoute.js";
import { cartRouter } from "./Router/CartRoute.js";
import reviewRouter from "./Router/reviewRoute.js";

const app = express();
const Port = 4040;

// database connection
DB_Connect();

// middleware 
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());


// routers
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/enroll", enrollRoute);
app.use("/api/v1/wishlist", wishlistRouet);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/course-review", reviewRouter);

// error handler middleware
app.use(notFound);
app.use(errorHandler);

app.listen(Port, () => {
    console.log("Server Running...")
})