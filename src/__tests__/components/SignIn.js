import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { SignInContainer } from "../../components/SignIn";

describe("SignIn", () => {
  describe("SignInContainer", () => {
    it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
      const onSubmit = jest.fn();
      const { getByPlaceholderText, getByText } = render(
        <SignInContainer onSubmit={onSubmit} />
      );

      fireEvent.changeText(getByPlaceholderText("Username"), "Ville");
      fireEvent.changeText(getByPlaceholderText("Password"), "Secret");
      fireEvent.press(getByText("Sign in"));

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);

        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: "Ville",
          password: "Secret",
        });
      });
    });

    it("won't call onSubmit function when trying to submit empty form", async () => {
      const onSubmit = jest.fn();
      const { getByText } = render(<SignInContainer onSubmit={onSubmit} />);

      fireEvent.press(getByText("Sign in"));

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(0);
      });
    });
  });
});
