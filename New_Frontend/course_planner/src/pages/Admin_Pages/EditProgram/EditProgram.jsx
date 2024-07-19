import React, { useState, useEffect } from 'react';
import axios from 'axios';
import plusButton from '../../../assets/plusButton.png';
import trashBin from '../../../assets/trashBin.png';
import editIcon from '../../../assets/editIcon.png';

import './EditProgram.scss';

const EditProgram = () => {
  const [programName, setProgramName] = useState('');
  const [originalProgramName, setOriginalProgramName] = useState(''); // Track original value
  const [hasUpdate, setUpdate] = useState(false); // Track original value
  const [programYear, setProgramYear] = useState('All');
  const [trimester, setTrimester] = useState('All');
  const [allCourses, setAllCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [hoveredCourse, setHoveredCourse] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalCourse, setModalCourse] = useState({ id: '', year: '2024', trimester: '1' });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showNoChangeMessage, setShowNoChangeMessage] = useState(false);
  const [isCancelPopupVisible, setIsCancelPopupVisible] = useState(false);
  

  const [selectedProgram, setSeletedProgram] = useState();
  const [onlineData, setOnlineData] = useState([]);

  const getData = async () => {
    try{
        const { data } = await axios.get("http://localhost:8080/pages/programs");
        setOnlineData(data.message);
        setSeletedProgram(data.message[0].uuid)
        setProgramName(data.message[0].name);
        setOriginalProgramName(data.message[0].name);
        setAllCourses(data.message[0].message);
        setFilteredCourses(data.message[0].message);
    }
    catch(error){
        console.log(error);
    }
  }

  useEffect(() => {
    getData();
  },[])

  useEffect(() => {
    filterCourses();
  }, [programYear, trimester, allCourses]);

  const filterCourses = () => {
    let courses = allCourses;
    if (programYear !== 'All') {
      courses = courses.filter(course => course.year === programYear);
    }
    if (trimester !== 'All') {
      courses = courses.filter(course => course.trimester === trimester);
    }
    setFilteredCourses(courses);
  };

  const handleCourseEdit = (course) => {
    setModalCourse(course);
    setIsModalVisible(true);
  };

  const handleCourseDelete = (courseId) => {
    setAllCourses(allCourses.filter(course => course.id !== courseId));
    setUpdate(true);
  };

  const handleModalSave = () => {
    if (modalCourse.id.trim()) {
      const courseExists = allCourses.some(course => course.id === modalCourse.id);
      
      if (courseExists) {
        const updatedCourses = allCourses.map(course => course.id === modalCourse.id ? modalCourse : course );
        setAllCourses(updatedCourses);
      } else {
        setAllCourses([...allCourses, modalCourse]);
      }
      filterCourses();
      setIsModalVisible(false);
      setShowSuccessMessage(true);
      setUpdate(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    } else {
      alert('Please enter a valid course ID.');
    }
  };

    
  const handleSaveClick = async () => {
    // Check if programName has changed
    if (programName !== originalProgramName || hasUpdate) {
      try{
        const { data } = await axios.post("http://localhost:8080/pages/programs", {uuid: selectedProgram, content: allCourses, name: programName});
        alert('Good');
      }
      catch(error){
        console.log(error.response?.data);
      }
      // Perform save operation here (e.g., API call, state update)
      // For demonstration, just log the changed programName
      console.log('Program Name has changed to:', programName);
      // Update originalProgramName to current value after saving
      setOriginalProgramName(programName);
      setShowSuccessMessage(true);
      setUpdate(false);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    } else {
      // Program Name has not changed, you may choose to do nothing or show a message
      setShowNoChangeMessage(true);
      setTimeout(() => setShowNoChangeMessage(false), 3000);
    }
  };
  
  const handlePreviewClick = () => {
    alert('Previewing changes.');
  };

  const handleAddCourseClick = () => {
    setModalCourse({ id: '', year: programYear !== 'All' ? programYear : '2024', trimester: trimester !== 'All' ? trimester : '1' });
    setIsModalVisible(true);
  };

  const handleCancelClick = () => {
    setIsCancelPopupVisible(true);
  };

  const handleCancelConfirmNo = () => {
    setIsCancelPopupVisible(false);
  };

  const handleCancelConfirmYes = () => {
    setIsCancelPopupVisible(false);
    alert('Changes have been discarded.');
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleClickOutsideModal = (e) => {
    if (e.target.className === 'modal') {
      closeModal();
    }
  };

  const [inputProgramName, setInputProgramName] = useState();
  const [isInputVisible, setIsInputVisible] = useState(false);
  const createProgram = async () => {
    if(inputProgramName.trim()){
      try{
        const { data } = await axios.post("http://localhost:8080/pages/create-program", {content: inputProgramName});
        setInputProgramName('');
        setIsInputVisible(false);
        alert('A new program has been created.');
      }
      catch(error){
        console.log(error.response?.data);
      }
    }
    else{
      alert('Kidnly fill a new program name.');
    }

  };

  const handleProgramUUID = (e) => {
    const value = e.target.selectedOptions[0].value;
    setSeletedProgram(value);
    for(let i = 0; i<onlineData.length; i++){
      const item = onlineData[i];
      if(item.uuid === value){
        setProgramName(item.name);
        setOriginalProgramName(item.name);
        setAllCourses(item.message);
        setFilteredCourses(item.message);
        break;
      }
    }
  }

  const handleDelete = async () => {
    if(selectedProgram.trim()){
      try{
        const { data } = await axios.post("http://localhost:8080/pages/delete-program", {content: selectedProgram});
        window.location.reload();
      }
      catch(error){
        console.log(error.response?.data);
      }
    }
  }

  return (
    <div className="edit-program">
      <h1>Edit Programs</h1>
      <select className="custom-dropdown" value={selectedProgram} onChange={handleProgramUUID}>
        {onlineData.map((i, idx) => 
          <option key={idx} value={i.uuid}>{i.name}</option>
        )}
      </select>
      <div className="sections">
        <div className="left-section">
          <div className="form-group uniform-size">
            <label htmlFor="program-name"><strong>Program Name</strong></label>
            <input type="text" id="program-name" value={programName} onChange={(e) => { setProgramName(e.target.value); setUpdate(true); }} />
          </div>
          <div className="form-group uniform-size">
            <label htmlFor="program-year"><strong>Program Year</strong></label>
            <div className="dropdown-container">
              <select id="program-year" value={programYear} onChange={(e) => setProgramYear(e.target.value)} className="custom-dropdown" >
                <option value="All">All</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
              </select>
              <span className="dropdown-icon">&#9660;</span>
            </div>
          </div>
          <div className="form-group uniform-size">
            <label htmlFor="trimester"><strong>Trimester</strong></label>
            <div className="dropdown-container">
              <select id="trimester" value={trimester} onChange={(e) => setTrimester(e.target.value)} className="custom-dropdown" >
                <option value="All">All</option>
                <option value="1">Trimester 1</option>
                <option value="2">Trimester 2</option>
                <option value="3">Trimester 3</option>
              </select>
              <span className="dropdown-icon">&#9660;</span>
            </div>
          </div>
        </div>
        <div className="right-section">
          <label><strong>Compulsory Courses</strong></label>
          <div className="courses-grid">
            {filteredCourses.map((course, index) => (
              <div
                key={index}
                className={`course ${hoveredCourse === index ? 'hovered' : ''}`}
                onMouseEnter={() => setHoveredCourse(index)}
                onMouseLeave={() => setHoveredCourse(null)}
              >
                {hoveredCourse === index ? (
                  <>
                    <img
                      src={editIcon}
                      alt="Edit"
                      className="edit-icon"
                      onClick={() => handleCourseEdit(course)}
                    />
                    <img
                      src={trashBin}
                      alt="Delete"
                      className="delete-icon"
                      onClick={() => handleCourseDelete(course.id)}
                    />
                  </>
                ) : (
                  course.id
                )}
              </div>
            ))}
            <div className="add-course" onClick={handleAddCourseClick}>
              <span className="plus-icon">+</span>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-buttons">
          <button className="cancel-button" onClick={() => setIsInputVisible(!isInputVisible)}>+ New Program</button>
          <button className="cancel-button" onClick={handleDelete}>Delete Program</button>
          <button className="cancel-button" onClick={handleCancelClick}>Cancel</button>
          <div className="right-buttons">
              <button className="preview-button" onClick={handlePreviewClick}>Preview</button>
              <button className="save-button" onClick={handleSaveClick}>Save</button>
          </div>
      </div>


      {showSuccessMessage && (
        <div className="success-message">
          Changes saved successfully!
        </div>
      )}

    {showNoChangeMessage && (
        <div className="success-message">
          No Changes Made.
        </div>
      )}

      {isModalVisible && (
        <div className="modal" onClick={handleClickOutsideModal}>
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>{modalCourse.id ? 'Edit Course' : 'Add Course'}</h2>
            <div className="form-group">
              <label htmlFor="course-id">Course ID</label>
              <input
                type="text"
                id="course-id"
                value={modalCourse.id}
                onChange={(e) => setModalCourse({ ...modalCourse, id: e.target.value })}
                className="centered-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="modal-program-year">Program Year</label>
              <div className="dropdown-container">
                <select
                  id="modal-program-year"
                  value={modalCourse.year}
                  onChange={(e) => setModalCourse({ ...modalCourse, year: e.target.value })}
                  className="custom-dropdown"
                >
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                </select>
                <span className="dropdown-icon">&#9660;</span>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="modal-trimester">Trimester</label>
              <div className="dropdown-container">
                <select
                  id="modal-trimester"
                  value={modalCourse.trimester}
                  onChange={(e) => setModalCourse({ ...modalCourse, trimester: e.target.value })}
                  className="custom-dropdown"
                >
                  <option value="1">Trimester 1</option>
                  <option value="2">Trimester 2</option>
                  <option value="3">Trimester 3</option>
                </select>
                <span className="dropdown-icon">&#9660;</span>
              </div>
            </div>
            <div className="modal-buttons">
              <button className="modal-cancel" onClick={() => setIsModalVisible(false)}>Cancel</button>
              <button className="modal-save" onClick={handleModalSave}>OK</button>
            </div>
          </div>
        </div>
      )}

      {isCancelPopupVisible && (
        <div className="modal" onClick={() => setIsCancelPopupVisible(false)}>
          <div className="modal-content">
            <span className="close" onClick={() => setIsCancelPopupVisible(false)}>&times;</span>
            <h2>Confirm Cancel</h2>
            <p>Are you sure you want to discard your changes?</p>
            <div className="modal-buttons">
              <button className="modal-cancel" onClick={handleCancelConfirmNo}>No</button>
              <button className="modal-save" onClick={handleCancelConfirmYes}>Yes</button>
            </div>
          </div>
        </div>
      )}

      {isInputVisible && (
        <div className="modal" onClick={handleClickOutsideModal}>
          <div className="modal-content">
            <span className="close" onClick={() => setIsInputVisible(false)}>&times;</span>
            <h2>Program</h2>
            <p>Enter new program name</p>
            <input type="text" placeholder="Bachelor of ..." value={inputProgramName} onChange={(e) => setInputProgramName(e.target.value)}/>
            <div className="modal-buttons">
              <button className="modal-cancel" onClick={() => setIsInputVisible(false)}>Cancel</button>
              <button className="modal-save" onClick={createProgram}>+ New Program</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProgram;
