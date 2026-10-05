import React from "react";

export const QuickBookingWidget: React.FC = () => {
  return (
    <form>
      <label>
        Номер телефону
        <input type="tel" />
      </label>
      <label>
        Послуга
        <input type="text" />
      </label>
      <button type="submit">Надіслати</button>
    </form>
  );
};
