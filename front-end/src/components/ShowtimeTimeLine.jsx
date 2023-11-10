import { createContext, useContext } from "react";
import "react-calendar-timeline/lib/Timeline.css";

import Timeline, {
  DateHeader,
  SidebarHeader,
  TimelineHeaders,
  TimelineMarkers,
  CustomMarker,
  TodayMarker,
  CursorMarker,
} from "react-calendar-timeline";
import moment from "moment";

const ShowtimeTimeLineContext = createContext();

export const ShowtimeTimeLineContextProvider = ({ children }) => {
  return (
    <ShowtimeTimeLineContext.Provider value={{}}>
      {children}
    </ShowtimeTimeLineContext.Provider>
  );
};

const TimelineComponent = ({
  groups,
  items,
  timeSteps,
  defaultTimeStart,
  defaultTimeEnd,
}) => {
  const ShowtimeTimeLineContext = createContext();

  return (
    <Timeline
      className="rounded"
      groups={groups}
      items={items}
      timeSteps={timeSteps}
      defaultTimeStart={defaultTimeStart}
      defaultTimeEnd={defaultTimeEnd}
      
    >
      <TimelineHeaders>
        <SidebarHeader>
          {({ getRootProps }) => {
            return (
              <div
                className="flex items-center justify-content-around bg-blue-200"
                {...getRootProps()}
              >
                <h1 className="font-bold text-l text-black ">
                  Các phòng chiếu
                </h1>
              </div>
            );
          }}
        </SidebarHeader>

        <DateHeader unit="primaryHeader" className="bg-blue-400 text-black" />

        <DateHeader />
      </TimelineHeaders>
      
    </Timeline>
  );
};

export default TimelineComponent;
