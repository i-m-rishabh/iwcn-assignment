
const data = [
    { heading: 'Onboarding Call', values: Array(5).fill('') },
    { heading: 'Google Search Console Access', values: Array(5).fill('') },
    { heading: 'Google Analysis Access', values: Array(5).fill('') },
    { heading: 'Website Access', values: Array(5).fill('') },
    { heading: 'Technical Audit', values: Array(5).fill('') },
    { heading: 'Anchor Text and Symantic Analysis', values:Array(5).fill('') },
    { heading: 'Competitor Analysis', values:Array(5).fill('') },
    { heading: 'Anchor Text/ URL mapping', values:Array(5).fill('') },
    { heading: 'Google Data Studio Report', values:Array(5).fill('') },
    { heading: 'Site Level Optimisation', values:Array(5).fill('') },
    { heading: 'Onpage Optimisation', values:Array(5).fill('') },
    { heading: 'Content Creation', values:Array(5).fill('') },
    { heading: 'Content Publishing', values:Array(5).fill('') },
    { heading: 'Premium Press Release', values:Array(5).fill('') },
    { heading: 'Authority Niche Placement', values:Array(5).fill('') },
    { heading: 'Index Lines', values:Array(5).fill('') },
    { heading: 'Video Recap', values:Array(5).fill('') },
];
function DataTable() {
    const [tableData, setTableData] = React.useState(data);
    function handleCellChange(value, rowIndex, colIndex) {
        
        setTableData((prev)=>{
            let newData = prev.map((row, index)=>{
                if(rowIndex === index){
                    return {
                        ...row,
                        values: [...row.values.slice(0, colIndex), value, ...row.values.slice(colIndex+1)]
                    }
                }else{
                    return row;
                }
            })
            return newData;
        })
    }

    function handlePostData() {
        console.log(tableData);
    }


    return (
        <div class="container">
            <table>
                <thead>
                    <tr>
                        <td colspan={6} class="heading">month 1</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        tableData.map((row, rowIndex) => {
                            return(
                                <tr key={rowIndex}>
                                    <td className='rowHeading'>{row.heading}</td>
                                    {
                                        row.values.map((value, colIndex)=>{
                                            return(
                                                <td contentEditable='true' key={colIndex} onBlur={(e)=>{handleCellChange(e.target.textContent, rowIndex, colIndex)}}>{value}</td>
                                            )
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <button onClick={() => { handlePostData()}}>post data</button>
        </div>
    )
}

ReactDOM.render(<DataTable />, document.getElementById('root'));