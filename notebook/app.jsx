function App() {
    return (
        <>
            <DisplayingData />
            <ShoppingList />
            <MyButton />
            <MyButton2 />
            <MyApp />
        </>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />   
);


{/* Displaying Data */}

//객체를 만들고
const user = {
    name: 'Hedy Lamarr',
    imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
    imageSize: 90,
};
// 중괄호로 escapte 한다.
const DisplayingData = () => {
    return (
        <>  
            <h1
                style={{color: "#1d5f7a"}}>Quick-Start</h1>
            <hr />
            <h2>Displaying Data</h2>
            <h3>{user.name}</h3>
            <img
            className="avatar"
            src={user.imageUrl}
            alt={'Photo of ' +  user.name}
            // jsx 중괄호 내부에 style 객체를 넣어서 중괄호가 두개임
            style={{
                width: user.imageSize,
                height: user.imageSize
            }}
        />
            <hr />
        </>
    );
}

{/* Rendering lists */}

const products = [
    {title: 'Cabbage', id: 1, isFruit: false},
    {title: 'Garlic', id: 2, isFruit: false},
    {title: 'Apple', id: 3, isFruit: true},
];

const ShoppingList = () => {
    const listItems = products.map(products => 
        <li 
        key={products.id}
        style={{
            color: products.isFruit ? 'red' : 'white'
        }}>
        {products.title}
        </li>);
    return (
        <>
            <h2>Rendering lists</h2>
            <ul>{listItems}</ul>
            <hr />
        </>
    );
}


{/* Responding events */}

const MyButton = () => {
    const handleClick = () => {
        alert('You Clicked me')
    };

    return (
        <>
            <h2>Responding Events</h2>
            <button onClick={handleClick}>
                Click me!
            </button>
            <hr />
        </>
        
    );
}

{/* Updating the screen */}

const MyButton2 = () => {
    const [count, setCount] = React.useState(0);
    const handleClick = () => {
        // 그냥 setCount 를 호출하면서 count 올라가는거 써주면 됨
        setCount(count + 1);
    }
    return (
        <>
            <h2>Updating the screen</h2>
            <button onClick={handleClick}>
                {count} 번 클릭하셨습니다.
            </button>
            <hr />
        </>
    )
}

{/* Sharing data between components */}

const MyApp = () => {
    // state 만들기
    const [count2, setCount2] = React.useState(0);

    const handelClick2 = () => {
        setCount2(count2 + 1);
    }

    return (
        <>
            <h2>Sharing data between components</h2>
            {/* count2, onClick props 를 밥상에(?) 올려두기 */}
            <MyButton3 count={count2} onClick={handelClick2} />
            <MyButton3 count={count2} onClick={handelClick2} />
            <hr />
        </>
    );
}

{/* props 떠먹기 */}
const MyButton3 = ({count, onClick}) => {
    return (
       <button onClick={onClick}>
        {count} 번 클릭하셨습니다.
       </button>
    )
}



