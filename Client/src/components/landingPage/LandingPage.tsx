import React from "react";
import "./landingpage.scss";
export const LandingPage = () => {
  return (
    <>
      <section className="frontpage">
        <h1>SÖDERMALM</h1>
        <button>BOKA NU</button>
      </section>
      <section className="img-section">
        <img src="/sandwich.jpg" alt="" />
        <img src="/restaurant.jpg" alt="" />
        <img src="/table.jpeg" alt="" />
      </section>
      <section className="view-menu">
        <img src="/tzatsiki.jpeg" alt="" />
        <div className="gotomenu">
          <h2>MAT FRÅN DET GREKISKA KÖKET</h2>
          <button>MENY</button>
        </div>
      </section>
    </>
  );
};
