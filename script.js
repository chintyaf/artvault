// 2372018 Chintya Fernanda Elysia A

// Ganti warna navbar
// link : https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_onscroll2
window.onscroll = function() { changeContent() };

function changeContent() {
    var changeNav = document.getElementById("navbar");
    var showPainting = document.getElementById("asidePainting");

    // console.log(showPainting)
        
    if (document.documentElement.scrollTop > 25) {
        changeNav.classList.add("active");
    } else { 
        changeNav.classList.remove("active");
    }

    if(showPainting === null) {
        // console.log("ignore")
    } else {
        if (document.documentElement.scrollTop > 525) {
            showPainting.classList.add("active");
        } else { 
            showPainting.classList.remove("active");
        }
    }
};

// setiap scroll bakal ada animasi
// link : https://youtu.be/T33NN_pPeNI?si=MGDfC2-wQ1g8LIwT
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        // console.log(entry);
        if(entry.isIntersecting){
            entry.target.classList.add('show-text'); 
        } else {
            entry.target.classList.remove('show-text');
        }
    })
})

const hiddenElements = document.querySelectorAll('.hidden-text');
hiddenElements.forEach((el) => observer.observe(el));

// Add navbar dan footer ke web 
fetch('partials/nav.html')
    .then(response => response.text())
    .then(html => {
        nav = document.getElementById("navbar").innerHTML = html;
    })
    .catch(error => console.error('Error loading HTML file:', error))

fetch('partials/footer.html')
    .then(response => response.text())
    .then(html => {
        nav = document.getElementById("footer").innerHTML = html;
    })
    .catch(error => console.error('Error loading HTML file:', error))


// Read link and get id
var currentPage = document.body.id;

// console.log(currentPage)

fetch('data.json')
.then((response) => response.json())
.then((data) => {
    // console.log(data);
    var artwork = data.artwork;
    var artist = data.artist;

        if (currentPage == "index") {
            const dataFeatured = document.querySelector('.featured-content')

            const featured = [2, 1, 3];
            // const featured = artwork.sort(() => Math.random() - 0.5).slice(0, 3).map(artwork => artwork.id);
            for(let i=0; i<featured.length; i++ ){
                id = featured[i]-1;
                // console.log(artwork[id].id);
                dataFeatured.innerHTML += 
                `<div class="featured-art align-items-center text-center" style="transition: 1s;">
                        <a href="/art.html?id=${artwork[id].id}">
                            <img class="mb-3" src="images/artwork/${artwork[id].image}">
                            <h1 class=""> ${artwork[id].title}</h1>
                            <a class="" href="artist.html?id=${artwork[i].artist_id}">
                                <p>by ${artwork[id].artist}</p>
                            </a>    
                        </a>
                </div>`;
            };
               
            const dataCollection = document.querySelector('#artworks');
            
            // Randomize munculin artworks
            // const excludeId = id + 1;  
            const others = artwork
                            // .filter(artwork => artwork.id != excludeId)
                            .sort(() => Math.random() - 0.5)
                            .slice(0, 4)
                            .map(artwork => artwork.id);
            console.log(artwork)
            // console.log(excludeId);
            // console.log(others);

            for(let i=0; i<others.length; i++ ){
                dataCollection.innerHTML += 
                `
                <div class="art-box">
                    <a href="/art.html?id=${artwork[i].id}"> 
                    <div>
                        <img class="mb-3" src="images/artwork/${artwork[i].image}">
                    </div>
                    <div class="d-flex flex-column">
                        <h1 class="">${artwork[i].title}</h1>
                        <a class="" href="artist.html?id=${artwork[i].artist_id}">
                            <p>by ${artwork[i].artist}</p>
                        </a>    
                    </div>
                    </a>
                </div>
                `;
                // let id = artwork[i];
                // console.log(artwork[i]);
            }
        };

        if (currentPage == "art" ) {
            const dataOthers = document.querySelector('.others-content');
            const urlParams = new URLSearchParams(window.location.search);
            const linkId = urlParams.get('id');

            id = linkId - 1;
            // console.log(artwork);
            // console.log(id);
            // console.log(artwork[id])

            // Masukkan data artwork untuk setiap bagian
            document.title = artwork[id].title;                           
            document.getElementById('art-image').src = "images/artwork/" + artwork[id].image;
            document.getElementById('art-image').alt = artwork[id].title;
            document.getElementById('art-title').textContent = artwork[id].title;
            document.getElementById('art-source').textContent = artwork[id].source;
            document.getElementById('artist').textContent = "by " + artwork[id].artist;
            document.getElementById('artist-link').setAttribute("href", "artist.html?id=" + artwork[id].artist_id);
            document.getElementById('art-source').setAttribute("href", artwork[id].source);

            document.getElementById('art-title2').textContent = artwork[id].title;
            document.getElementById('artist2').textContent = "by " + artwork[id].artist;
            document.getElementById('artist-link2').setAttribute("href", "artist.html?id=" + artwork[id].artist_id);
            document.getElementById('art-image2').src = "images/artwork/" + artwork[id].image;
            document.getElementById('art-image2').alt = artwork[id].title;

            // Menambahkan source image
            imageSource = document.createComment("Image source : " + artwork[id].source);
            document.getElementById('art-image').appendChild(imageSource);
            document.getElementById('art-image2').appendChild(imageSource);

            // Masukkan paragraf terpisah
            let p;
            const dataDescription = document.querySelector(`#art-description`);
            description = artwork[id].description;
            for(let i=0; i<description.length; i++ ){
                p = document.createElement('p');
                p.innerHTML = `<p> ${description[i]}</p>`
                dataDescription.appendChild(p);
            }

            // Randomize munculin others  
            const excludeId = id + 1;  
            const others = artwork
                            .filter(artwork => artwork.id != excludeId)
                            .sort(() => Math.random() - 0.5)
                            .slice(0, 3)
                            .map(artwork => artwork.id);
            // console.log(artwork.id)
            // console.log(excludeId);
            // console.log(others);
            for(let i=0; i<others.length; i++ ){
                let id = others[i]-1;
                console.log(artwork[id])
                // console.log(artwork[id].id);
                                    
                dataOthers.innerHTML += 
                `<div class="other-art align-items-center">
                    <a href="/art.html?id=${artwork[id].id}">
                        <img class="mb-3" src="images/artwork/${artwork[id].image}">
                        <h1 class="">${artwork[id].title}</h1>
                        <a class="" href="artist.html?id=${artwork[id].artist_id}">
                            <p>by ${artwork[id].artist}</p>
                        </a>    
                    </a>
                </div>`;
             }
        };

        if(currentPage == "collection") {
            const dataCollection = document.querySelector('#artworks');

            for(let i=0; i<artwork.length; i++ ){
                dataCollection.innerHTML += 
                `
                <div class="art-box">
                    <a href="/art.html?id=${artwork[i].id}"> 
                    <div>
                        <img class="mb-3" src="images/artwork/${artwork[i].image}">
                    </div>
                    <div class="d-flex flex-column">
                        <h1 class="">${artwork[i].title}</h1>
                        <a class="" href="artist.html?id=${artwork[i].artist_id}">
                            <p>by ${artwork[i].artist}</p>
                        </a>    
                    </div>
                    </a>
                </div>
                `;
                // let id = artwork[i];
                // console.log(artwork[i]);
            }
        };

        if(currentPage == "artist") {
            const dataOtherArtwork = document.querySelector('.other');
            const urlParams = new URLSearchParams(window.location.search);
            const linkId = urlParams.get('id');

            id = linkId - 1;
            // console.log(artist[id].image)

            // Masukkan data artist untuk setiap bagian
            document.title = artist[id].artist;                              
            document.getElementById('artist-name').textContent = artist[id].artist;
            document.getElementById('artist-source').textContent = artist[id].infoSource;
            document.getElementById('artist-image').src = "images/artist/" + artist[id].image;
            document.getElementById('artist-image').alt = artist[id].artist;

            // Menambahkan source image
            artistSource = document.createComment("Image source : " + artist[id].imgSource);
            document.getElementById('artist-image').appendChild(artistSource);


            // Profile data 
            // console.log(artist[id].info)
            // info = artist[id].info;
            // const profileData = document.querySelector(`#profile-table`);
            // for(let i=0; i<info.length; i++) {
            //     profileData.innerHTML += `
            //     <tr>
            //         <td> ${info[i].title} </td>
            //         <td> : </td>
            //         <td>  ${info[i].data} </td>
            //     </tr>`;
            // }

            // Deskripsi 
            let p;
            const artistDescription = document.querySelector(`#artist-description`);
            description = artist[id].description;
            for(let i=0; i<description.length; i++ ){
                p = document.createElement('p');
                p.innerHTML = `<p> ${description[i]}</p>`
                artistDescription.appendChild(p);
            }

            // Other Arworks by Artist
            const otherByArtist = document.querySelector('#other-art');

            var byArtist = artist[id].artworks_id;
            for(let i=0; i<byArtist.length; i++ ){
                art_id = byArtist[i]-1;
                // console.log(art_id);
                otherByArtist.innerHTML += 
                `<div class="art-box">
                    <a href="/art.html?id=${artwork[art_id].id}"> 
                    <div>
                        <img class="mb-3" src="images/artwork/${artwork[art_id].image}">
                    </div>
                    <div class="d-flex flex-column">
                        <h1 class="">${artwork[art_id].title}</h1>
                        <a class="" href="artist.html?id=${artwork[art_id].artist_id}">
                            <p>by ${artwork[art_id].artist}</p>
                        </a>    
                    </div>
                    </a>
                </div>
                `;
            }

        };

});
