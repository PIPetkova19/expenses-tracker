
import MonthlyChart from './MonthlyChart';
import WeeklyChart from './WeeklyChart';

function Home() {
    return (
        <div>
            <div >
                <p>Current balance</p>
                <p>20 lv.</p>
            </div>

            <div id="my-chart">
                <MonthlyChart></MonthlyChart>
                <WeeklyChart></WeeklyChart>
            </div>
        </div>
    );
}

export default Home;
