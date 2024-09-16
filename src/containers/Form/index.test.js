import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Form from "./index";

describe("When Form is created", () => {
  it("a list of input is displayed", async () => {
    render(<Form />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success action is called", async () => {
      const onSuccess = jest.fn();
      render(<Form onSuccess={onSuccess} />);
      fireEvent(
        await screen.findByTestId("button-test-id"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await waitFor(() => screen.findByText("Message evoyé !"), { timeout: 1000 });
      // add a waitFor pour tester asynchrone et attente de l'affichage du message
      expect(onSuccess).toHaveBeenCalled();
    });
  });
});
