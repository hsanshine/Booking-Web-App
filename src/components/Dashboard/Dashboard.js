import BookingTable from "../BookingTable/BookingTable"
import Calendar from "../Calendar/Calendar"

const Dashboard = ({ date, onSelectDate, bookings, status, onView }) => {
  //console.log(bookings);
  //console.log(date);
  const handleSelectDate = (newDate) => {
    //console.log("new set date is", newDate);
    onSelectDate(newDate)
  }
  return (
    <div className="container p-3">
      <div className="d-flex gap-3 flex-column flex-md-row">
        <div className="col">
          <Calendar onSelectDate={handleSelectDate} />
        </div>
        <div className="col">
          <BookingTable
            date={date}
            bookings={bookings}
            status={status}
            onView={onView}
          />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
