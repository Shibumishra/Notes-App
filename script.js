let addBtn = document.getElementById("add");

let notes = JSON.parse(localStorage.getItem('notes'));
if(notes){
    notes.forEach(note => {
        addNewNotes(note);
    })
}

addBtn.addEventListener("click", () => {
  addNewNotes();
});

function addNewNotes(text = '') {
  let note = document.createElement("div");
  note.classList.add("note");

  note.innerHTML = `

    <div class="notes">
      <div class="tools">
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
      </div>
       <div class="main ${text ? "" : "hidden"}"></div>
      <textarea name="text" id="" cols="30" rows="10" class="${text ? "hidden" : ""}"></textarea>
    </div>

    `;

  let editBtn = note.querySelector(".edit");
  let deleteBtn = note.querySelector(".delete");

  let main = note.querySelector(".main");
  let testArea = note.querySelector("textarea");

  testArea.value= text;
  main.innerHTML = text;

  editBtn.addEventListener("click", () => {
    main.classList.toggle("hidden");
    testArea.classList.toggle("hidden");
  });

  deleteBtn.addEventListener("click", () => {
    note.remove();

    updateLocalStroage();
  });

  testArea.addEventListener("input", (e) => {
    let { value } = e.target;

    main.innerHTML = marked(value);

    updateLocalStroage();
  });

  document.body.appendChild(note);
}

function updateLocalStroage(){
    let notesText = document.querySelectorAll('textarea')

    let notes = [];
    notesText.forEach(note => {
        notes.push(note.value)
    });
    localStorage.setItem('notes', JSON.stringify(notes));
}
