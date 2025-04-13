// import React from "react";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../hooks";
import { fetchGoals, setSelectedGoal, updateGoal } from "../store/slices/goalsSlice";
import ErrorBoundary from "./ErrorBoundary";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import { Task } from "../types/index";
import "./GoalsList.css";

function GoalsList() {
  const dispatch = useAppDispatch();
  const goalsState = useAppSelector((state) => state.goals);
  const goals = goalsState?.goals || [];
  const selectedGoal = goalsState?.selectedGoal;
  const status = goalsState?.status || 'idle';

  useEffect(() => {
    dispatch(fetchGoals());
  }, [dispatch]);

  const onDragEnd = (result: any) => {
    if (!result.destination || !selectedGoal) return;

    const items = Array.from(selectedGoal.tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const updatedGoal = {
      ...selectedGoal,
      tasks: items
    };
    
    dispatch(updateGoal(updatedGoal));
  };

  if (status === 'loading') {
    return <div className="goals-list">Loading...</div>;
  }

  if (status === 'failed') {
    return <div className="goals-list">Error loading goals</div>;
  }

  return (
    <ErrorBoundary>
      <div className="goals-list">
        <h2>Goals</h2>
        <div className="goals-container">
          {Array.isArray(goals) && goals.map((goal) => (
            <div
              key={goal._id}
              className={`goal-item ${
                selectedGoal?._id === goal._id ? "selected" : ""
              }`}
              onClick={() => dispatch(setSelectedGoal(goal))}
              style={{ borderLeftColor: goal.color }}
            >
              <div className="goal-title">{goal.title}</div>
              {selectedGoal?._id === goal._id && (
                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId="tasks">
                    {(provided) => (
                      <div
                        className="tasks-list"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {Array.isArray(goal.tasks) && goal.tasks.map((task, index) => (
                          <Draggable
                            key={task._id || index}
                            draggableId={task._id || `task-${index}`}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`task-item ${snapshot.isDragging ? 'dragging' : ''}`}
                                style={{
                                  ...provided.draggableProps.style,
                                  backgroundColor: task.color
                                }}
                              >
                                {task.title}
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              )}
            </div>
          ))}
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default GoalsList;
