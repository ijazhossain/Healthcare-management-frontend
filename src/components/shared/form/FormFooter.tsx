import { CardFooter } from "@/components/ui/card"
import Link from "next/link"
interface FormFooterProps {
    label:string
    children: React.ReactNode;}
const FormFooter = ({label,children}:FormFooterProps) => {
  return (
     <CardFooter className="justify-center border-t pt-4">
        {/* Don't have an account */}
        <p className="text-sm text-muted-foreground">
            {label}{" "}
            <Link
                href="/register"
                className="text-primary font-medium hover:underline underline-offset-4"
            >
              
                {children}
            </Link>
        </p>
      </CardFooter>
  )
}
export default FormFooter