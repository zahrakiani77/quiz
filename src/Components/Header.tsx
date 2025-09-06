import Container from "./Container";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../stores/ThemeProvider";

const Header = ({className}: {className:string}) => {
    const { theme, setTheme } = useTheme();

    const getCurrentTheme=()=>{
      if(theme==='system'){
        return window.matchMedia("(prefers-color-scheme:dark)").matches ? 'dark':'light'
      }
      return theme
    }

    const currentTheme=getCurrentTheme();
  return (
    <Container
      className={`flex items-center justify-between bg-darker-background px-6 py-3 ${className}`}
    >
      <h1 className="font-Poppins text-xl font-medium">Quiz</h1>
      <span className="size-8 rounded-lg bg-background">
        {currentTheme === "dark" ? (
          <Moon
            onClick={() => setTheme("light")}
            className="m-1 cursor-pointer"
          />
        ) : (
          <Sun
            onClick={() => setTheme("dark")}
            className="m-1 cursor-pointer"
          />
        )}
      </span>
    </Container>
  );
};

export default Header;
