const { createClient } = supabase;
const supabaseClient = createClient(
  "https://plgqdwybyppfpblwamzq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsZ3Fkd3lieXBwZnBibHdhbXpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxMTgxNDcsImV4cCI6MjA1OTY5NDE0N30.1zl610ycbBzaarhEZHn8HaLD9VWYqIrl1ScCPof41tA"
);

async function smth() {
  const container = document.getElementById("data-container");

  // document.body.appendChild(container);

  let { data: some, error } = await supabaseClient.from("some").select("*");

  console.log(some);

  if (error) {
    console.error("Error:", error);
  } else {
    some.forEach((item) => {
      const itemDiv = document.createElement("div");
      itemDiv.className = "food-card";
      itemDiv.innerHTML = `
                    <img class="food_image" src="${
                      item.Image || "https://via.placeholder.com/150"
                    }" alt="${item.Name || "Food Item"}" />
                    <div class="food-info">
                      <div class="food-header">
                        <h3>${item.Name || "Untitled"}</h3>
                    <img class="food_badge" src="Assets/Icons/${
                      item.Category === "Non-Veg" ? "nonveg.svg" : "veg.svg"
                    }" alt="${item.Category}">

                      </div>
                      <p>${item.Description || "No description available."}</p>
                      <div class="food-footer">
                        <span class="price">₹${item.Cost || "00.00"}</span>
                        <button class="add-to-cart">
                          <img class="foodimage" src="Assets/Icons/plus-circle.svg" alt="plus" />
                          Add
                        </button>
                      </div>
                    </div>
                  `;
      container.appendChild(itemDiv);
    });
  }
}

smth();
