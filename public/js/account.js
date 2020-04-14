
// listen for auth status changes
auth.onAuthStateChanged(user => {
  if (user) {
    document.getElementById("name").innerHTML = "Welcome -" + user.email + "";
    db.collection('reviews').where("user_Id", "==", user.uid).onSnapshot(snapshot => {
      setupGuides(snapshot.docs);
    }, err => console.log(err.message));
  } else {
    window.location = 'index.html';
  }
});


// sList all notes
const guideList = document.querySelector('.guides');
function setupGuides(data) {
  if (data.length) {
    let html = '';
    data.forEach(doc => {
      const id = doc.id;
      const post = doc.data();
      const li = `
          <li>
            <div class="collapsible-header  grey lighten-4"> ${post.title}</div>
            <div class="collapsible-body  white">${post.content}<button value =${id} onclick="del_post(this.value)" class="contact100-form-btn" id="delete_post">
						Delete
					</button>
          </li>
        `;
      html += li;

    });
    guideList.innerHTML = html
  } else {
    guideList.innerHTML = '<h5 class="center-align">No Notes</h5>';
  }
}

// delete
function del_post(id) {
  db.collection('reviews').doc(id).delete().then(function () {
    console.log("Document successfully deleted!");
  }).catch(
    function (error) {
      console.error("Error removing document: ", error);
    });

}

document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.collapsible');
  var instances = M.Collapsible.init(elems);
});
// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut();
});