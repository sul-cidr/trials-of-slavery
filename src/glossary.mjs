import { computePosition, flip, shift, offset } from "@floating-ui/dom";

const documents = document.querySelectorAll(".document .translation");

const response = await fetch("../../glossary.json");
const glossary = await response.json();

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

const renderEmphasis = (text) => {
  return text
    .split("*")
    .map((part, i) => {
      if (i % 2 === 0) return part;
      return `<em>${part}</em>`;
    })
    .join("");
};

const markupDoc = (doc) => {
  Object.entries(glossary).forEach(([terms, gloss]) => {
    terms.split(",").forEach((term) => {
      console.log(term);
      doc.innerHTML = doc.innerHTML.replace(
        new RegExp(term, "g"),
        `<span class="glossary" aria-describedby="tooltip">${term}</span>
         <span role="tooltip" class="gloss">
           <span class="header">${term}</span>
           ${renderEmphasis(gloss)}
         </span>`,
      );
    });
  });

  doc.querySelectorAll(".glossary").forEach((termSpan) => {
    eventMap.forEach(([event, listener]) => {
      termSpan.addEventListener(event, listener);
    });
  });
};

documents.forEach((doc) => markupDoc(doc));
