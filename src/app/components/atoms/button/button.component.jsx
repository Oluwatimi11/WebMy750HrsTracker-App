import Spinner from "../spinner/spinner.component.jsx";
import { BaseButton, CurvedButton } from "./button.styles.jsx";

export const BUTTON_TYPE_CLASSES = {
  straight: "base",
  curved: "curved",
};

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) =>
  ({
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.curved]: CurvedButton,
  }[buttonType]);

const Button = ({ children, isLoading, buttonType, ...otherProps }) => {
  const CustomButton = getButton(buttonType);
  return (
    <CustomButton disabled={isLoading} {...otherProps}>
      {isLoading ? (
        <div>
          <Spinner />
        </div>
      ) : (
        children
      )}
    </CustomButton>
  );
};

export default Button;
