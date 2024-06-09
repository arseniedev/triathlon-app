export default function Calculator() {

    const [average, setAverage] = React.useState("-")
    const [speed, setSpeed] = React.useState("-")

    return (
        <div>
            <div className="border p-3">
                <p>Calculated Speed: {average}</p>
            </div>
            <div className="border p-3">
                <p>Average Speed: {speed}</p>
            </div>
        </div>
    )
}