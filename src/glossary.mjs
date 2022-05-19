import { computePosition, flip, shift, offset } from "@floating-ui/dom";

const documents = document.querySelectorAll(".document .translation");

const glossary = {
  heemraden: "Definition of heemraden",
};

const showGloss = (event) => {
  const termSpan = event.target;
  const glossSpan = termSpan.nextElementSibling;
  glossSpan.style.display = "block";
  update(termSpan, glossSpan);
};

const hideGloss = (event) => {
  const termSpan = event.target;
  const glossSpan = termSpan.nextElementSibling;
  glossSpan.style.display = "";
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

const markupDoc = (doc) => {
  Object.keys(glossary).forEach((term) => {
    doc.innerHTML = doc.innerHTML.replace(
      new RegExp(term, "g"),
      `<span class="glossary" aria-describedby="tooltip">${term}</span>
       <span role="tooltip" class="gloss"><span class="header">${term}</span>${glossary[term]}</span>`,
    );
  });

  doc.querySelectorAll(".glossary").forEach((termSpan) => {
    eventMap.forEach(([event, listener]) => {
      termSpan.addEventListener(event, listener);
    });
  });
};

documents.forEach((doc) => markupDoc(doc));
