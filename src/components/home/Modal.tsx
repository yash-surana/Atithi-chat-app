import React from "react";

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  item: string | null;
}

const Modal: React.FC<ModalProps> = ({ isVisible, onClose, item }) => {
  if (!isVisible || !item) return null;

  const foodItems: Record<string, string[]> = {
    Beverages: ["Coke", "Pepsi", "Orange Juice", "Water","Mocktails","Flavoured Milk","Beers","Wine","Vodka"],
    Salads: ["Caesar Salad", "Greek Salad", "Caprese Salad"],
    Soups: ["Tomato Soup", "Chicken Soup", "Vegetable Soup","Manchau Soup","Mutton Soup","Sweet corn Soup"],
    Sweets: ["Chocolate Cake", "Ice Cream", "Brownies","Gulab Jamun","Rasmalai","Gajar Halwa","Moongdal Halwa","Kheer","Rabdi","Walnut Halwa","Mohanthal"],
    Starters: ["Spring Rolls", "Bruschetta", "Stuffed Mushrooms","Panner Tikka","Chili Potato","Cheesey Fries","Peri-Peri Fries"],
    'Main Course': ['Steak', 'Pasta', 'Grilled Chicken',"Shahi Paneer","Kadhai Paneer","Malai Chaap","Dal Makhani","Biryani","Raita","Butter Naan","Butter Roti","Malai Chicken"]
  };

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <button onClick={onClose} style={styles.closeButton}>Close</button>
        <h2 style={{textDecoration:"underline",color:"black",alignSelf:"flex-start",fontWeight:"bolder"}}>{item}</h2>
        <ul>
          {foodItems[item].map((food, index) => (
            <li key={index}>{food}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const styles = {
  modalOverlay: {
    position: "fixed" as "fixed",
    bottom: "8%",
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end"
  },
  modalContent: {
    backgroundColor: "#EBC4A0",
    width: "100%",
    padding: "20px",
    color:"brown",
    textAlign:"center",
    fontSize:"large",
    borderTopLeftRadius: "20px",
    borderTopRightRadius: "20px",
    maxHeight: "50%",
    overflowY: "auto"
  },
  closeButton: {
    position: "absolute" as "absolute",
    top: "50px",
    right: "10px"
  }
};

export default Modal;
