import loginImg from "../assets/Images/login.webp"
import Template from "../components/core/Auth/Template"

function Login() {
  return (
    <Template
      title="Welcome back to study point"
      description1="Enhance your skills and more"
      description2="Education to future-proof your career."
      image={loginImg}
      formType="login"
    />
  )
}

export default Login