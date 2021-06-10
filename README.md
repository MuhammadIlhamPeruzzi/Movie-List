# Search Movie App Project

This project is simple React JS application where we can search movie and see the details about that movie using omdb API. This project was created to fulfill the technical test on stockbit.

## Installation
To get the project up and running, and view components in the browser, complete the following steps:

1. Download and install Node: <https://nodejs.org/>
2. Clone this repo: `git clone git@github.com:MuhammadIlhamPeruzzi/Movie-List.git` (SSH) or `git clone https://github.com/MuhammadIlhamPeruzzi/Movie-List.git` (HTTPS)
3. Install project dependancies: `npm install`
4. Start the development environment: `npm start`
5. Open your browser and visit <http://localhost:3000>

## Development
When developing components, you may want assets automatically compiled and the browser to refresh automatically. To do this, run the following task:

* `npm run dev`

## Creating a static build
To create a static instance of this project, run the following task:

* `npm run build`

This will create a folder called `www`, into which the required files will be created.

## React Hooks Used

Here are some implementations of react hook on this project :

### 1. `useState`
`useState` used to handle reactive data present in a component. When data in `useState` change, the UI will re-render. That way data displayed is the data with the latest changes. In this project, one of the uses of `useState` used to indicate data retrieval is in progress. The code snippet is as follows:

```js
const [loading, setLoading] = useState(false);
```

### 2. `useEffect`
`useEffect` used to perform side effects from a function component. Fuction in `useEffect` will be run when component mounted, data in array dependencies change, and before component is removed from UI (optionally). In this project, one of the uses of `useEffect` used in `movieDetail.js` to display information of selected movie.
The code snippet is as follows:

```js
useEffect(() => {
    if (imdbID && imdbID !== "") getDetailMovie(imdbID);
    return () => {
      dispatch(removeSelectedMovie());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imdbID]);
```

### 3. `useSelector`
`useSelector` hooks is react-redux hooks that can be used to extract data from the Redux store state, using a selector function. The code snippet is as follows:
```js
let allMovies = useSelector((state) => state.allMovies.movies);
```

### 4. `useDispatch`
`useDispatch` hooks is react-redux hooks that can be used to dispatch action from redux store, so we can use it at the component. The code snippet is as follows:
```js
const dispatch = useDispatch();
...
const getDetailMovie = async (idImdb) => {
    setLoading(true);
    setTimeout(() => {
      MovieServices.getDetailMovie(idImdb)
        .then((res) => {
          if(res){
            dispatch(selectedMovie(res));
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() =>{
          setLoading(false);
        })
      }
    ,1500);
  }
```

## Additional Information
Answer for 'Logic Test' saved in `AnagramGroup.js`. The source code:
```js
 function checkAnagram(s1, s2) {

    if(s1.length !== s2.length){
        return false
    }
    const NO_OF_CHARS = 256;
    let counter = new Array(NO_OF_CHARS);
    for(let i = 0; i < NO_OF_CHARS; i++)
    {
        counter[i] = 0;
    }
    for(var i = 0; i < s1.length; i++)
    {
        counter[s1.charCodeAt(i)]++;
        counter[s2.charCodeAt(i)]--;
    }
    for(var i = 0; i < NO_OF_CHARS; i++)
        if (counter[i] != 0)
        {
            return false;
        }
    return true;
}

function groupAnagram(arrStr){
    usedArr = []
    result = []
    for(var i=0; i<arrStr.length;i++){
        if(usedArr.indexOf(arrStr[i])<0){
            var group = []
            for(var j=i+1; j<arrStr.length;j++){
                if(checkAnagram(arrStr[i], arrStr[j])){
                    group.push(arrStr[j])
                    usedArr.push(arrStr[j])
                }
            }
            group.push(arrStr[i])
            usedArr.push(arrStr[i])
            result.push(group)
        }
    }
    return result
}

const testArr = ['kita', 'atik', 'tika', 'aku', 'kia', 'makan', 'kua']

console.log(groupAnagram(testArr))
```
