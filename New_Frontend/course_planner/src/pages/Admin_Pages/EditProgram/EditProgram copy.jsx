import React, { useState, useEffect } from 'react';
import plusButton from '../../../assets/plusButton.png';
import trashBin from '../../../assets/trashBin.png';
import editIcon from '../../../assets/editIcon.png';

import './EditProgram.css';

const initialCourses = [
  { id: 'ECON1001', year: '2024', trimester: 'Trimester 1' },
  { id: 'SENG1110', year: '2024', trimester: 'Trimester 1' },
  { id: 'SENG1120', year: '2024', trimester: 'Trimester 2' },
  { id: 'COMP3350', year: '2024', trimester: 'Trimester 2' },
  { id: 'EBUS3050', year: '2024', trimester: 'Trimester 2' },
  { id: 'SENG1050', year: '2024', trimester: 'Trimester 3' },
  { id: 'SENG2130', year: '2024', trimester: 'Trimester 3' },
  { id: 'INFT3100', year: '2024', trimester: 'Trimester 3' },
  { id: 'COMP3851A', year: '2025', trimester: 'Trimester 1' },
  { id: 'INFT2060', year: '2025', trimester: 'Trimester 1' },
  { id: 'INFT2051', year: '2025', trimester: 'Trimester 1' },
  { id: 'SENG2260', year: '2025', trimester: 'Trimester 1' },
  { id: 'COMP3851B', year: '2025', trimester: 'Trimester 2' },
  { id: 'INFT3800', year: '2025', trimester: 'Trimester 2' },
  { id: 'INFT3950', year: '2025', trimester: 'Trimester 2' },
  { id: 'INFT3050', year: '2025', trimester: 'Trimester 2' },
  { id: 'COMP1140', year: '2026', trimester: 'Trimester 1' },
  { id: 'COMP1010', year: '2026', trimester: 'Trimester 1' },
  { id: 'COMP1140', year: '2026', trimester: 'Trimester 2' },
  { id: 'EBUS3030', year: '2026', trimester: 'Trimester 2' },
  { id: 'INFT2150', year: '2026', trimester: 'Trimester 3' },
  { id: 'MATH1510', year: '2026', trimester: 'Trimester 3' },

  // Add more courses as needed
];

const EditProgram = () => {
  const [programName, setProgramName] = useState('Bachelor of Information Technology');
  const [originalProgramName, setOriginalProgramName] = useState('Bachelor of Information Technology'); // Track original value
  
  const [programYear, setProgramYear] = useState('All');
  const [trimester, setTrimester] = useState('All');
  const [allCourses, setAllCourses] = useState(initialCourses);
  const [filteredCourses, setFilteredCourses] = useState(initialCourses);
  const [hoveredCourse, setHoveredCourse] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalCourse, setModalCourse] = useState({ id: '', year: '2024', trimester: 'Trimester 1' });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showNoChangeMessage, setShowNoChangeMessage] = useState(false);
  const [isCancelPopupVisible, setIsCancelPopupVisible] = useState(false);

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
      setIsModalVisible(false);
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    } else {
      alert('Please enter a valid course ID.');
    }
  };

    
  const handleSaveClick = () => {
    // Check if programName has changed
    if (programName !== originalProgramName) {
      // Perform save operation here (e.g., API call, state update)
      // For demonstration, just log the changed programName
      console.log('Program Name has changed to:', programName);
      // Update originalProgramName to current value after saving
      setOriginalProgramName(programName);
      setShowSuccessMessage(true);
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
    setModalCourse({ id: '', year: programYear !== 'All' ? programYear : '2024', trimester: trimester !== 'All' ? trimester : 'Trimester 1' });
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

  return (
    <div className="edit-program">
      <h1>Edit Program</h1>
      <div className="sections">
        <div className="left-section">
          <div className="form-group uniform-size">
            <label htmlFor="program-name"><strong>Program Name</strong></label>
            <input type="text" id="program-name" value={programName} onChange={(e) => setProgramName(e.target.value)} />
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
                <option value="Trimester 1">Trimester 1</option>
                <option value="Trimester 2">Trimester 2</option>
                <option value="Trimester 3">Trimester 3</option>
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
                  <option value="Trimester 1">Trimester 1</option>
                  <option value="Trimester 2">Trimester 2</option>
                  <option value="Trimester 3">Trimester 3</option>
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
    </div>
  );
};

export default EditProgram;
