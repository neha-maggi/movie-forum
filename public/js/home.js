
// listen for auth status changes
auth.onAuthStateChanged(user => {
  if (user) {
    var ver = user.emailVerified;
    if (ver) {
      db.collection('reviews').onSnapshot(snapshot => {
        setupGuides(snapshot.docs);
      }, err => console.log(err.message));

      //Create Notes
      const createForm = document.querySelector('#create-note');
      createForm.addEventListener('submit', (e) => {
        e.preventDefault();
        db.collection('reviews').add({
          title: createForm.title.value,
          user_Id: auth.currentUser.email,
          content: createForm.content.value
        }).then(() => {
          // close the create modal & reset form
          createForm.reset();
        }).catch(err => {
          console.log(err.message);
        });

      });

    }
    else {
      window.location = 'index.html';
    }
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
      const post = doc.data();
      const li = `
          <li>
            <div class="collapsible-header  grey lighten-4"> ${post.title}</div>
            <div class="collapsible-body  white">${post.content}<br> By ${post.user_Id}</div>
          </li>
        `;
      html += li;

    });
    guideList.innerHTML = html
  } else {
    guideList.innerHTML = '<h5 class="center-align">No Reviewss</h5>';
  }
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