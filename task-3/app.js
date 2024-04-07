function App() {
    const [data, setData] = React.useState([]);
    const [phonenumber, setPhonenumber] = React.useState('');
    function getHeaders() {
        fetch('https://chimpu.xyz/api/post.php', {
            method: 'POST',
            body: JSON.stringify({ phonenumber: phonenumber }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                let formatedHeader = [];
                response.headers.forEach((value, key)=>{
                    formatedHeader.push([key, value]);
                })
                console.log(formatedHeader);
                setData(formatedHeader);
                setPhonenumber('');
            })
            .catch(error => {
                console.log('error in getting header data', error);
            })
    }
    function handlePhoneChange(event) {
        let phone = event.target.value;
        setPhonenumber(phone);
    }
    return (
        <div>
            <h1>Get Header Data</h1>
            <div>
                <input
                    type='text'
                    value={phonenumber}
                    placeholder="phone number here..."
                    onChange={handlePhoneChange}
                />
                <button onClick={getHeaders}>Get Header Data</button>
            </div>
            <div>
                <table>
                    {
                        data.map(([key,value, index])=>{
                            return(
                                <tr key={index}>
                                    <td style={{fontWeight: 'bold'}}>{key}</td>
                                    <td>{value}</td>
                                </tr>
                            )
                        })
                    }
                </table>
            </div>
        </div>

    )
}

ReactDOM.render(<App />, document.getElementById('root'));