const baseUrl = process.env.NODE_ENV === "production" 
? 'enter-production-url-here' 
: 'http://localhost:3000';

export default baseUrl;