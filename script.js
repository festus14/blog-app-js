const postAuthor = ['Festus Omole', 'Daniel Omole', 'Bukky Omole', 'Prof. Soyinka']
const header = document.getElementById('header')
const loading = document.getElementById('loading')
const pickPost = document.getElementById('display-post')
const postContent = document.getElementById('display-content')

postContent.style.display = 'none'
pickPost.style.display = 'none'

const getPosts = () => {
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(allData => {
            data = allData.slice(0, 4)
            loading.style.display = 'none';
            pickPost.style.display = 'block'
            for(let post = 0; post < data.length; post++){
                let titleText = document.createTextNode(data[post].title)
                let titleContent = document.createElement('h3')
                titleContent.appendChild(titleText)
                // let titleContent = textToTag(data[post].title, 'h3');
                
                let authorText = document.createTextNode('By '+ postAuthor[post])
                let author = document.createElement('h5')
                author.appendChild(authorText)

                let headerContent = document.createElement('div')
                headerContent.className = 'header-content'
                headerContent.appendChild(titleContent)
                headerContent.appendChild(author)
                headerContent.id = data[post].id
                headerContent.addEventListener('click', () => displayPost(data[post].id))

                header.appendChild(headerContent)
            }
        })
    .catch (error => {
        loading.innerText = 'Network Error Please Reload'
        setTimeout(() => {
            loading.style.display = 'none'
        }, 8000);
    }) 
}

getPosts();

const displayPost = async id => {
    loading.style.display = 'block';
    loading.innerText = 'Loading...'
    pickPost.style.display = 'block'
    pickPost.innerText = 'Loading...'
    try {
        await fetch('https://jsonplaceholder.typicode.com/posts/' + id)
        .then(response => response.json())
        .then(singlePost => {
            loading.style.display = 'none';
            postContent.style.display = 'inline-flex'
            pickPost.style.display = 'none'
            let titleContent = document.getElementById('titleContent')
            titleContent.innerText = singlePost.title;

            let contentContent = document.getElementById('content')
            contentContent.innerText = singlePost.body

            let button = document.getElementById('deletePost')
            button.addEventListener('click', () => deletePost(singlePost.id))

        })
    } catch (error) {
        if(id){
            loading.innerText = 'Network Error'
            pickPost.innerText = 'Network Error'
        }else{
            loading.innerText = 'This post can not be retrieved'
        }

        setTimeout(() => {
            loading.style.display = 'none'
            pickPost.style.display = 'none'
        }, 6000);
    }
    
}

const deletePost = async id => {
    loading.style.display = 'block';
    loading.innerText = 'Loading...'
    try {
        await fetch('https://jsonplaceholder.typicode.com/posts/' + id, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            loading.innerText = 'Post Successfully Deleted'
            setTimeout(() => {
                loading.style.display = 'none'
                location.reload();
            }, 3000);
        })
    } catch (error) {
        if(id){
            loading.innerText = 'Deleting Failed'
        }else{
            loading.innerText = 'Network Error'
        }
        setTimeout(() => {
            loading.style.display = 'none'
        }, 6000);
    }
    
}

let addPostTag = document.getElementById('addPost')
addPostTag.addEventListener('click', () => addPostFunc())

const addPostFunc = async () => {
    loading.style.display = 'block';
    loading.innerText = 'Loading...'
    let addTitle = document.getElementById('addTitle')
    let addBody = document.getElementById('addContent')
    let author = document.getElementById('author')
    if(addTitle.value === '' || addBody.value === ''){
        loading.innerText = 'Please fill in the missing details'
        setTimeout(() => {
            loading.style.display = 'none'
        }, 6000);
        return
    }
    let postData = {
        userId: author.value,
        title: addTitle.value,
        body: addBody.value,
        author: author.value
    }
    
    try {
        await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(postData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            loading.innerText = 'Post Successfully Added'
            setTimeout(() => {
                loading.style.display = 'none'
                location.reload();
            }, 3000);
        });
    } catch (error) {
        console.log('Posting ererer', error)
    }
    
}

let authorTag = document.getElementById('author')

for(let i = 0; i<postAuthor.length; i++){
    let option = document.createElement('option');
    option.innerText = postAuthor[i]
    authorTag.appendChild(option)
}

// const textToTag = (text, tag) => {
//     let Text = document.createTextNode(text)
//     let Tag = document.createElement(tag)
//     return Tag.appendChild(Text);
// }

// const tagToParentTag = (tag, parentTag) => {
//     let Tag = document.createElement(tag)
//     let ParentTag = document.createElement(parentTag)
//     return ParentTag.appendChild(Tag);
// }