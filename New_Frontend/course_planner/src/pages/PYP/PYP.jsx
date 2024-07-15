import React from 'react';
import NavigationBar from '../../components/NavigationBar';
import pypStyles from './PYP.module.css';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DragDrop from '../plan_your_path_demo/PlanYourPathDemo';

const PYP = () => {
    return (
        <div className={pypStyles.pyp_container}>
            <NavigationBar />
            <div>
                <DndProvider backend={HTML5Backend}>
                    <div className="App">
                    <DragDrop />
                    </div>
                </DndProvider>
            </div>
        </div>
    );
}
export default PYP;