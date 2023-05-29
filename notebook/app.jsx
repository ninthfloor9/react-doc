function App() {
    return (
        <>
            <DisplayingData />
            <ShoppingList />
            <MyButton />
            <MyButton2 />
        </>
    )
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
            <hr />
            <h1>Displaying Data</h1>
            <h1>{user.name}</h1>
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
            <h1>Rendering lists</h1>
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
            <h1>Responding Events</h1>
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
            <h1>Updating the screen</h1>
            <button onClick={handleClick}>
                {count} 번 클릭하셨습니다.
            </button>
            <hr />
        </>
    )
}



