import { computePosition, flip, shift, offset } from "@floating-ui/dom";

const documents = document.querySelectorAll(".document .translation");

const showGloss = (event) => {
  const termSpan = event.target;
  const glossSpan = termSpan.nextElementSibling;
  glossSpan.classList.add("shown");
  update(termSpan, glossSpan);
};

const hideGloss = (event) => {
  const termSpan = event.target;
  const glossSpan = termSpan.nextElementSibling;
  glossSpan.classList.remove("shown");
};

const eventMap = [
  ["mouseenter", showGloss],
  ["mouseleave", hideGloss],
  ["focus", showGloss],
  ["blur", hideGloss],
];

const update = (termSpan, glossSpan) => {
  computePosition(termSpan, glossSpan, {
    placement: "top",
    middleware: [offset(6), flip(), shift({ padding: 5 })],
  }).then(({ x, y }) => {
    Object.assign(glossSpan.style, {
      left: `${x}px`,
      top: `${y}px`,
    });
  });
};

const addGlossaryEvents = (doc) => {
  doc.querySelectorAll(".glossary").forEach((termSpan) => {
    eventMap.forEach(([event, listener]) => {
      termSpan.addEventListener(event, listener);
    });
  });
};

documents.forEach((doc) => addGlossaryEvents(doc));
