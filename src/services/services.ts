import axiosInstance from './api';
import { SignUpDetails } from '../modals/SignUp';
import { LoginDetails } from '../modals/Login';
import { QuestionDetails } from '../modals/Question';
import { AddToCart } from '../modals/Cart';

//login Service
export const LoginService = (credentials: LoginDetails) => {
    let loginPayload;
    loginPayload = {
      user_name: `${credentials.UserName}`,
      password: `${credentials.Password}`,
    };
    return axiosInstance.post('/authentication/login', loginPayload);
};

//Registration Service
export const SignUpService = (signUpData: SignUpDetails) => {
  let signUpPayload;
  signUpPayload = {
    first_name: `${signUpData.FirstName}`,
    mobile_number: `${signUpData.MobileNumber}`,
    email: `${signUpData.EmailID}`,
    trading_name: `${signUpData.TradingName}`,
  };
  return axiosInstance.post('/authentication/register', signUpPayload);
};

//Category Service
export const CategoryService = () => {
  return axiosInstance.get('/customer/categories');
};

//Category Service
export const SavedProductService = (flag: string) => {
  return axiosInstance.get('/customer/save-product/list/' + flag);
};

// History Products Service
export const HistoryProductService = () => {
  return axiosInstance.get('/customer/history-product/list');
}

// Get Question List Service
export const GetQuestionListService = () => {
  return axiosInstance.get('/customer/get-question');
}

//Ask Question Service
export const AskQuestionService = (askQuestionData: QuestionDetails) => {
  let askQuestPayload;
  askQuestPayload = {
    name: `${askQuestionData.Name}`,
    mobile_number: `${askQuestionData.MobileNumber}`,
    user_id: `${askQuestionData.UserID}`, // Needed?
    product_id: `${askQuestionData.ProductID}`,  // Needed?
    question_id: `${askQuestionData.QuestionID}`,
    company_name: `${askQuestionData.CompanyName}`,
    comments: `${askQuestionData.Comments}`,
  };
  return axiosInstance.post('/customer/ask-question', askQuestPayload);
};

// Product Details Service
export const GetProductDetailsService = (productID: string) => {
  return axiosInstance.get('/customer/product-detail/'+ productID);
}

// Add To Cart Service
export const AddToCartService = (cartData: AddToCart) => {
  let addToCartPayload;
  addToCartPayload = {
    product_id: `${cartData.ProductID}`,
    quantity: `${cartData.Quantity}`,
    user_id: `${cartData.UserID}`, // Needed?
  };
  return axiosInstance.post('/customer/cart/add-product', addToCartPayload);
}
