

const DinoPackPage = () => {
  const navigate = useNavigate();

  const handlePurchase = (itemName, price) => {
    navigate("/checkout", { state: { itemName, price } });
  };

  const ad1Ref = useRef(null); // สร้าง ref สำหรับ Ad1

  const location = useLocation(); // ใช้ useLocation() แทน location
  if (location.state?.scrollTo === "Ad1" && ad1Ref.current) {
    ad1Ref.current.scrollIntoView({ behavior: "smooth" });
  }
  

  return (
    <div className="all" id="header">
      <div className="Header">
        <h1 className="text-4xl font-bold mb-4">ARK Survival Evolved</h1>
        <Link to="/">HOME</Link>
        <a href="#Ad1"> MENU</a>
        <a href="#dinopack" className="cursor-pointer hover:underline">SHOP</a>
        <p>Coin🪙: ?????</p>
      </div>

      <div className="container">
        <div className="Ad1" id="Ad1">
          <img src="/image/Addino2.jpg" alt="ARK Screenshot" />
        </div>
      </div>

      <div className="dinopack">
        <h1 className="text-2xl font-semibold" id="dinopack">DinoPack</h1>
        <div className="shop-section2">
          <div className="dino-item1 cursor-pointer" onClick={() => handlePurchase("Giga", 5000)}>
            <img src="/image/giga.jpg" alt="Giga" className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold">Giga</h3>
            <p className="text-lg">Price: 5000 Coins</p>
          </div>

          <div className="dino-item1 cursor-pointer" onClick={() => handlePurchase("Triceratops", 3500)}>
            <img src="/image/triceratops.jpg" alt="Triceratops" className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold">Triceratops</h3>
            <p className="text-lg">Price: 3500 Coins</p>
          </div>
        </div>

        <div className="shop-section2">
          <div className="dino-item1 cursor-pointer" onClick={() => handlePurchase("Deinonychus", 6000)}>
            <img src="/image/deinonychus.jpg" alt="Deinonychus" className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold">Deinonychus</h3>
            <p className="text-lg">Price: 6000 Coins</p>
          </div>

          <div className="dino-item1 cursor-pointer" onClick={() => handlePurchase("Reaper", 45000)}>
            <img src="/image/REAPER.jpg" alt="Reaper" className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold">Reaper</h3>
            <p className="text-lg">Price: 45000 Coins</p>
          </div>
        </div>

        <div className="shop-section2">
          <div className="dino-item1 cursor-pointer" onClick={() => handlePurchase("Griffin", 6000)}>
            <img src="/image/Griffin.jpg" alt="griffin" className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold">Griffin</h3>
            <p className="text-lg">Price: 6000 Coins</p>
          </div>

          <div className="dino-item1 cursor-pointer" onClick={() => handlePurchase("Basilick", 6000)}>
            <img src="/image/Basilick.jpg" alt="Bas" className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold">Basilick</h3>
            <p className="text-lg">Price: 6000 Coins</p>
          </div>

         
        </div>
      </div>
    </div>
  );
};


const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { itemName, price } = location.state || {};
  const [isPurchased, setIsPurchased] = useState(false);

  if (!itemName || !price) {
    return <div>Loading...</div>;
  }

  const handleConfirm = () => {
    setIsPurchased(true); // เปิด Modal
    setTimeout(() => {
      alert(`คุณได้ซื้อ ${itemName} เรียบร้อยแล้ว! ราคา ${price} coin`);
      navigate('/dino-pack', { state: { itemName, price } });
    }, 100);

    setTimeout(() => {
      setIsPurchased(false);
    }, 2000);
  };

  return (
    <div className="checkout">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      <div className="dino-details">
        <img
          src={`/image/${itemName.toLowerCase().replace(" ", "")}.jpg`}
          alt={itemName}
          className="w-full h-40 object-cover rounded-md mb-4"
        />
        <h3 className="text-2xl font-semibold">{itemName}</h3>
        <p className="text-lg">Price: {price} Coins</p>
      </div>

      <div className="button-group">
        <button onClick={() => navigate(-1)} className="back-btn">
          BACK
        </button>
        <button onClick={handleConfirm} className="purchase-btn">BUY NOW</button>
      </div>

      {/* Popup Modal */}
      {isPurchased && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="checkmark">✔</div>
            <h2>ซื้อสำเร็จ!</h2>
          </div>
        </div>
      )}
    </div>
  );
};




const BlueprintPage = () => {
  const navigate = useNavigate(); // เพิ่ม useNavigate

  const handlePurchase = (itemName, price) => {
    navigate("/checkout", { state: { itemName, price } }); // ส่งข้อมูลไปหน้า Checkout
  };
  const ad1Ref = useRef(null); // สร้าง ref สำหรับ Ad1

  const location = useLocation(); // ใช้ useLocation() แทน location
  if (location.state?.scrollTo === "Ad1" && ad1Ref.current) {
    ad1Ref.current.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="min-h-screen bg-gray-800 text-white flex flex-col items-center p-6" id="header">
      <div className="Header">
        <h1 className="text-4xl font-bold mb-4">ARK Survival Evolved</h1>
        <Link to="/">HOME</Link>
        <a href="#header"> MENU</a>
        <a href="#store-section">Shop</a>
        <p>Coin🪙: 10000</p>
      
      </div>

      <div className="container">
        <div className="Ad1" id="Ad1">
          <img src="/image/wallpaperart2.jpg" alt="ARK Screenshot" />
        </div>
      </div>

      <div className="blueprint">
        <h1 className="text-2xl font-semibold ">Blueprint</h1>
        <div className="shop-section2" id="store-section">
          <div className="ART-item1" onClick={() => handlePurchase("Flak Chestpiece", 45000)}>
            <img src="/image/FlakChestpiece.jpg" alt="Flak Chestpiece" className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold">Blueprint: Flak Chestpiece</h3>
            <p className="text-lg">Price: 10000 Coins</p>
          </div>

          <div className="ART-item1" onClick={() => handlePurchase("Flak Leggings", 45000)}>
            <img src="/image/FlakLeggings.jpg" alt="FlakLeggings" className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold">Blueprint: Flak Leggings</h3>
            <p className="text-lg">Price: 25000 Coins</p>
          </div>
        </div>

        <div className="shop-section2">
          <div className="ART-item1" onClick={() => handlePurchase("Flak Gauntlets", 45000)}>
            <img src="/image/FlakGauntlets.jpg" alt="FlakGauntlets" className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold">Blueprint: Flak Gauntlets</h3>
            <p className="text-lg">Price: 60000 Coins</p>
          </div>

          <div className="ART-item1" onClick={() => handlePurchase("Flak Boots", 45000)}>
            <img src="/image/FlakBoots.jpg" alt="FlakBoots" className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold">Blueprint: Flak Boots</h3>
            <p className="text-lg">Price: 45000 Coins</p>
          </div>
        </div>
      </div>
    </div>
  );
};



// ---------------------------------------- Start----------------------------------------


const EquipmentPage = () => {
  const navigate = useNavigate();

  const handlePurchase = (itemName, price) => {
    navigate("/checkout", { state: { itemName, price } });
  };
  const ad1Ref = useRef(null); // สร้าง ref สำหรับ Ad1

  const location = useLocation(); // ใช้ useLocation() แทน location
  if (location.state?.scrollTo === "Ad1" && ad1Ref.current) {
    ad1Ref.current.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="min-h-screen bg-gray-800 text-white flex flex-col items-center p-6" id="header">
      <div className="Header">
        <h1 className="text-4xl font-bold mb-4">ARK Survival Evolved</h1>
        <Link to="/">HOME</Link>
        <a href="#header"> MENU</a>
        <a href="#store-section">Shop</a>
        <p>Coin🪙: 10000</p>
       
      </div>

      <div className="container">
        <div className="Ad1">
          <img src="/image/Adequip2.jpg" alt="ARK Screenshot" />
        </div>
      </div>

      <div className="equip">
        <h1 className="text-2xl font-semibold">Equipment</h1>
        <div className="shop-section2" id="store-section">

        <div className="ART-item1 cursor-pointer" onClick={() => handlePurchase("metalpick", 5000)}>
            <img src="/image/metalpick.jpg" alt="metalpick" className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold">Ascendant metal pick</h3>
            <p className="text-lg">Price: 5000 Coins</p>
          </div>

          <div className="ART-item1 cursor-pointer" onClick={() => handlePurchase("actionshotgun", 5000)}>
            <img src="/image/actionshotgun.jpg" alt="actionshotgun" className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold">actionshotgun</h3>
            <p className="text-lg">Price: 5000 Coins</p>
          </div>

         

        </div>

        <div className="shop-section2">

          <div className="ART-item1" onClick={() => handlePurchase("longneckrifle", 60000)}>
            <img src="/image/longneckrifle.jpg" alt="longneckrifle" className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold">Ascendant longneck rifle</h3>
            <p className="text-lg">Price: 60000 Coins</p>
          </div>

          <div className="ART-item1" onClick={() => handlePurchase("fabricatedsniperrifle", 45000)}>
            <img src="/image/fabricatedsniperrifle.jpg" alt="fabricatedsniperrifle" className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold">Ascendant fabricated sniper rifle</h3>
            <p className="text-lg">Price: 45000 Coins</p>
          </div>

        </div>
      </div>
    </div>
  );
};

const ArtifactsPage = () => {
  const navigate = useNavigate();

  const handlePurchase = (itemName, price) => {
    navigate("/checkout", { state: { itemName, price } });
  };
  const ad1Ref = useRef(null); // สร้าง ref สำหรับ Ad1

  const location = useLocation(); // ใช้ useLocation() แทน location
  if (location.state?.scrollTo === "Ad1" && ad1Ref.current) {
    ad1Ref.current.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="min-h-screen bg-gray-800 text-white flex flex-col items-center p-6" id="header">
      <div className="Header">
        <h1 className="text-4xl font-bold mb-4">ARK Survival Evolved</h1>
        <Link to="/">HOME</Link>
        <a href="#header"> MENU</a>
        <a href="#store-section">Shop</a>
        <p>Coin🪙: 10000</p>
        
      </div>

      <div className="container">
        <div className="Ad1">
          <img src="/image/wallpaper1.jpg" alt="ARK Screenshot" />
        </div>
      </div>

      <div className="art">
        <h1 className="text-2xl font-semibold">Artifacts</h1>
        <div className="shop-section2" id="store-section">

        <div className="ART-item1 cursor-pointer" onClick={() => handlePurchase("ArtifactofMassive", 5000)}>
            <img src="/image/ArtifactofMassive.jpg" alt="ArtifactofMassive" className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold">Artifact of Massive</h3>
            <p className="text-lg">Price: 5000 Coins</p>
          </div>

          <div className="ART-item1 cursor-pointer" onClick={() => handlePurchase("ArtifactCunning", 5000)}>
            <img src="/image/ArtifactCunning.jpg" alt="ArtifactCunning" className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold">Artifact of Cunning</h3>
            <p className="text-lg">Price: 5000 Coins</p>
          </div>

        
        </div>

        <div className="shop-section2">
        <div className="ART-item1 cursor-pointer" onClick={() => handlePurchase("ArtifactofChaos", 5000)}>
            <img src="/image/ArtifactofChaos.jpg" alt="ArtifactofChaos" className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold">Artifact of Chaos</h3>
            <p className="text-lg">Price: 5000 Coins</p>
          </div>

        <div className="ART-item1 cursor-pointer" onClick={() => handlePurchase("ArtifactGrowth", 5000)}>
            <img src="/image/ArtifactGrowth.jpg" alt="ArtifactGrowth" className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold">Artifact of Growth</h3>
            <p className="text-lg">Price: 5000 Coins</p>
          </div>

          
        </div>
      </div>
    </div>
  );
};


const CavePage = () => {
  const navigate = useNavigate();

  const handlePurchase = (itemName, price) => {
    navigate("/checkout", { state: { itemName, price } });
  };
  const ad1Ref = useRef(null); // สร้าง ref สำหรับ Ad1

  const location = useLocation(); // ใช้ useLocation() แทน location
  if (location.state?.scrollTo === "Ad1" && ad1Ref.current) {
    ad1Ref.current.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="min-h-screen bg-gray-800 text-white flex flex-col items-center p-6" id="header">
      <div className="Header">
        <h1 className="text-4xl font-bold mb-4">ARK Survival Evolved</h1>
        <Link to="/">HOME</Link>
        <a href="#header">MENU</a>
        <a href="#store-section">Shop</a>
        <p>Coin🪙: 10000</p>
        
      </div>
      <div className="container">
        <div className="Ad1">
          <img src="/image/Adcave2.jpg" alt="ARK Screenshot" />
        </div>
      </div>

      <div className="cave">
        <h1 className="text-2xl font-semibold">CAVE</h1>
        <div className="shop-section2" id="store-section">
          <div className="dino-item1 cursor-pointer" onClick={() => handlePurchase("Pearl Cave", 10000)}>
            <img src="/image/Pearlcave.jpg" alt="Pearl Cave" className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold">Pearl Cave</h3>
            <p className="text-lg">Price: 10000 Coins</p>
          </div>

          <div className="dino-item1 cursor-pointer" onClick={() => handlePurchase("Ice Cave", 25000)}>
            <img src="/image/Icecave.jpg" alt="Ice Cave" className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold">Ice Cave</h3>
            <p className="text-lg">Price: 25000 Coins</p>
          </div>
        </div>

        <div className="shop-section2">
          <div className="dino-item1 cursor-pointer" onClick={() => handlePurchase("Luna Cave", 60000)}>
            <img src="/image/Lunacave.jpg" alt="Luna Cave" className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold">Luna Cave</h3>
            <p className="text-lg">Price: 60000 Coins</p>
          </div>

          <div className="dino-item1 cursor-pointer" onClick={() => handlePurchase("Church Cave", 45000)}>
            <img src="/image/Churchcave.jpg" alt="Church Cave" className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold">Church Cave</h3>
            <p className="text-lg">Price: 45000 Coins</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const StructuresPage = () => {
  const navigate = useNavigate();

  const handlePurchase = (itemName, price) => {
    navigate("/checkout", { state: { itemName, price } });
  };
  const ad1Ref = useRef(null); // สร้าง ref สำหรับ Ad1

  const location = useLocation(); // ใช้ useLocation() แทน location
  if (location.state?.scrollTo === "Ad1" && ad1Ref.current) {
    ad1Ref.current.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="min-h-screen bg-gray-800 text-white flex flex-col items-center p-6" id="header">
      <div className="Header">
        <h1 className="text-4xl font-bold mb-4">ARK Survival Evolved</h1>
        <Link to="/">HOME</Link>
        <a href="#header">MENU</a>
        <a href="#store-section">Shop</a>
        <p>Coin🪙: 10000</p>
        
      </div>

      <div className="container">
        <div className="Ad1">
          <img src="/image/wall5.jpg" alt="ARK Screenshot" />
        </div>
      </div>

      <div className="struct">
        <h1 className="text-2xl font-semibold">Structures</h1>
        <div className="shop-section2" id="store-section">

        <div className="struct-item1" onClick={() => handlePurchase("IndustrialForge", 45000)}>
            <img src="/image/IndustrialForge.jpg" alt="IndustrialForge" className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold">Industrial Forge</h3>
            <p className="text-lg">Price: 10000 Coins</p>
          </div>

        <div className="struct-item1" onClick={() => handlePurchase("IndustrialCooker", 45000)}>
            <img src="/image/IndustrialCooker.jpg" alt="IndustrialCooker" className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold">IndustrialCooker</h3>
            <p className="text-lg">Price: 10000 Coins</p>
          </div>
        </div>

        <div className="shop-section2">
          <div className="struct-item1 cursor-pointer" onClick={() => handlePurchase("Fabricator", 60000)}>
            <img src="/image/Fabricator.jpg" alt="Fabricator" className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold">Fabricator</h3>
            <p className="text-lg">Price: 60000 Coins</p>
          </div>

          <div className="struct-item1 cursor-pointer" onClick={() => handlePurchase("TekTransmitter", 60000)}>
            <img src="/image/TekTransmitter.jpg" alt="TekTransmitter" className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold">Tek Transmitter</h3>
            <p className="text-lg">Price: 60000 Coins</p>
          </div>
        </div>
      </div>
    </div>
  );
};








// ---------------------------------------------------ไม่ต้องทำ-------------------------------------------------------
const App = () => (
  <Routes>
    <Route path="/" element={<ARKHome />} />
    <Route path="/dino-pack" element={<DinoPackPage />} />
    <Route path="/blueprint" element={<BlueprintPage />} />
    <Route path="/equipment" element={<EquipmentPage />} />
    <Route path="/artifacts" element={<ArtifactsPage />} />
    <Route path="/cave" element={<CavePage />} />
    <Route path="/structures" element={<StructuresPage />} />
    <Route path="/checkout" element={<CheckoutPage />} />
  </Routes>
);

export default App;
