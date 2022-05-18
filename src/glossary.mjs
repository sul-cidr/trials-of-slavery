const documents = document.querySelectorAll(".document .translation");

const glossary = {
  heemraden: "Definition of heemraden",
};

const markupDoc = (doc) => {
  Object.keys(glossary).forEach((term) => {
    doc.innerHTML = doc.innerHTML.replace(
      new RegExp(term, "g"),
      `<span class="glossary">${term}</span>`,
    );
  });
};

documents.forEach((doc) => markupDoc(doc));
