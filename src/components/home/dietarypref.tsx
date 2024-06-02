import { useParams } from "next/navigation";
import PieChart from "./Piechart";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";
import Modal from "./Modal"; // Import the modal component

const DietaryPref: React.FC = () => {
  const params = useParams();
  const { id } = params as { id: string };
  const event = useQuery(api.events.getEventById, id ? { id } : "skip");
  const data = [60, 30, 10];
  const labels = ["Veg", "Non-veg", "Eggetarian"];

  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const items = [
    { name: 'Beverages', count: 15 },
    { name: 'Salads', count: 5 },
    { name: 'Soups', count: 5 },
    { name: 'Sweets', count: 7 },
    { name: 'Starters', count: 8 },
    { name: 'Main Course', count: 20 }
  ];

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
  };

  return (
    <div
      className="item"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "6%"
      }}
    >
      <div
        className="guestlist"
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <h3>Guests</h3>
        <br />
        <h3>Total Guests: {event?.guests.length}</h3>
        <div className="piediv">
          <PieChart data={data} labels={labels} />
        </div>
        <button style={{ marginLeft: "3%" }} className="todo-add-button">
          View Guest Preference
        </button>
      </div>

      <div className="paymentschedule" id="id-2136281">
        <div style={{ textAlign: "center", alignSelf: "center", fontSize: "xx-large" }}>
          <h1>Menu</h1>
        </div>
        <br />
        <div className="works" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {items.map((item) => (
            <div
              key={item.name}
              className="work1"
              style={{ 
                color: "brown", 
                position: 'relative', 
                padding: '20px', 
                border: '1px solid brown', 
                cursor: 'pointer' 
              }}
              onClick={() => handleItemClick(item.name)}
            >
              <h3>{item.name}</h3>
              <h3>{item.count}</h3>
            </div>
          ))}
        </div>
        <button className="viewpay">View All Items</button>
      </div>
      <Modal 
        isVisible={isModalVisible} 
        onClose={handleCloseModal} 
        item={selectedItem} 
      />
    </div>
  );
};

export default DietaryPref;
