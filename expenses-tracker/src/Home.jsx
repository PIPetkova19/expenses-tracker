
import MyChart from './MyChart'; 
function Home() {
    return (
        <div>
            <div>
                <p>Current balance</p>
                <p>20 lv.</p>
            </div>

            <div>
                <p>Monthly report</p>
                <div>
                    <MyChart></MyChart>
                </div>
                  <p>Daily report</p>
                <div>
                    <MyChart></MyChart>
                </div>
            </div>
        </div>
    );
}

export default Home;
