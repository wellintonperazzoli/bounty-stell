



const Challenge3 = (props) => {
    return (
        <div className="challenge">
            <h1>Challenge 3</h1>
            <p>Move to the right</p>
            <button onClick={() => props.continueGame()}>Continue</button>
        </div>
    )
}


export default Challenge3;