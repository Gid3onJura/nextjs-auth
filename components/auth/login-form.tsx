import { CardWrapper } from "@/components/auth/card-wrapper"

const LoginForm = () => {
  return (
    <CardWrapper
      headerLabel="Willkommen zurück"
      backButtonLabel="Du hast noch keinen Zugang?"
      backButtonHref="/auth/register"
      showSocial
    >
      <span>dsfdfdf</span>
    </CardWrapper>
  )
}

export default LoginForm
