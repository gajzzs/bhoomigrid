export const STATES_AND_UTS = [
  {
    code: 'UP', name: 'Uttar Pradesh', type: 'state', capital: 'Lucknow', zones: 18,
    districts: [
      'Agra','Aligarh','Ambedkar Nagar','Amethi','Amroha','Auraiya','Ayodhya','Azamgarh','Baghpat','Bahraich','Ballia','Balrampur','Banda','Barabanki','Bareilly','Basti','Bhadohi','Bijnor','Budaun','Bulandshahr','Chandauli','Chitrakoot','Deoria','Etah','Etawah','Farrukhabad','Fatehpur','Firozabad','Gautam Buddha Nagar','Ghaziabad','Ghazipur','Gonda','Gorakhpur','Hamirpur','Hapur','Hardoi','Hathras','Jalaun','Jaunpur','Jhansi','Kannauj','Kanpur Dehat','Kanpur Nagar','Kasganj','Kaushambi','Kheri','Kushinagar','Lalitpur','Lucknow','Maharajganj','Mahoba','Mainpuri','Mathura','Mau','Meerut','Mirzapur','Moradabad','Muzaffarnagar','Pilibhit','Pratapgarh','Prayagraj','Raebareli','Rampur','Saharanpur','Sambhal','Sant Kabir Nagar','Shahjahanpur','Shamli','Shravasti','Siddharthnagar','Sitapur','Sonbhadra','Sultanpur','Unnao','Varanasi'
    ].map(d => ({ code: 'UP_' + d.substring(0,3).toUpperCase(), name: d, hq: d }))
  },
  {
    code: 'MP', name: 'Madhya Pradesh', type: 'state', capital: 'Bhopal', zones: 10,
    districts: [
      'Agar Malwa','Alirajpur','Anuppur','Ashoknagar','Balaghat','Barwani','Betul','Bhind','Bhopal','Burhanpur','Chhatarpur','Chhindwara','Damoh','Datia','Dewas','Dhar','Dindori','Guna','Gwalior','Harda','Hoshangabad','Indore','Jabalpur','Jhabua','Katni','Khandwa','Khargone','Mandla','Mandsaur','Morena','Narsinghpur','Neemuch','Niwari','Panna','Raisen','Rajgarh','Ratlam','Rewa','Sagar','Satna','Sehore','Seoni','Shahdol','Shajapur','Sheopur','Shivpuri','Sidhi','Singrauli','Tikamgarh','Ujjain','Umaria','Vidisha','Pandhurna','Maihar','Mauganj'
    ].map(d => ({ code: 'MP_' + d.substring(0,3).toUpperCase(), name: d, hq: d }))
  },
  {
    code: 'MH', name: 'Maharashtra', type: 'state', capital: 'Mumbai', zones: 6,
    districts: [
      'Ahmednagar','Akola','Amravati','Aurangabad','Beed','Bhandara','Buldhana','Chandrapur','Dhule','Gadchiroli','Gondia','Hingoli','Jalgaon','Jalna','Kolhapur','Latur','Mumbai City','Mumbai Suburban','Nagpur','Nanded','Nandurbar','Nashik','Osmanabad','Palghar','Parbhani','Pune','Raigad','Ratnagiri','Sangli','Satara','Sindhudurg','Solapur','Thane','Wardha','Washim','Yavatmal'
    ].map(d => ({ code: 'MH_' + d.substring(0,3).toUpperCase(), name: d, hq: d }))
  },
  {
    code: 'RJ', name: 'Rajasthan', type: 'state', capital: 'Jaipur', zones: 7,
    districts: [
      'Ajmer','Alwar','Banswara','Baran','Barmer','Bharatpur','Bhilwara','Bikaner','Bundi','Chittorgarh','Churu','Dausa','Dholpur','Dungarpur','Hanumangarh','Jaipur','Jaisalmer','Jalore','Jhalawar','Jhunjhunu','Jodhpur','Karauli','Kota','Nagaur','Pali','Pratapgarh','Rajsamand','Sawai Madhopur','Sikar','Sirohi','Sri Ganganagar','Tonk','Udaipur','Anoopgarh','Balotra','Beawar','Deeg','Didwana-Kuchaman','Dudu','Gangapur City','Jaipur Rural','Jodhpur Rural','Kekri','Khairthal-Tijara','Kotputli-Behror','Neem Ka Thana','Phalodi','Salumbar','Sanchore','Shahpura'
    ].map(d => ({ code: 'RJ_' + d.substring(0,3).toUpperCase(), name: d, hq: d }))
  },
  {
    code: 'TN', name: 'Tamil Nadu', type: 'state', capital: 'Chennai', zones: 6,
    districts: [
      'Ariyalur','Chengalpattu','Chennai','Coimbatore','Cuddalore','Dharmapuri','Dindigul','Erode','Kallakurichi','Kanchipuram','Kanyakumari','Karur','Krishnagiri','Madurai','Mayiladuthurai','Nagapattinam','Namakkal','Nilgiris','Perambalur','Pudukkottai','Ramanathapuram','Ranipet','Salem','Sivaganga','Tenkasi','Thanjavur','Theni','Thoothukudi','Tiruchirappalli','Tirunelveli','Tirupathur','Tiruppur','Tiruvallur','Tiruvannamalai','Tiruvarur','Vellore','Viluppuram','Virudhunagar'
    ].map(d => ({ code: 'TN_' + d.substring(0,3).toUpperCase(), name: d, hq: d }))
  },
  {
    code: 'BR', name: 'Bihar', type: 'state', capital: 'Patna', zones: 9,
    districts: [
      'Araria','Arwal','Aurangabad','Banka','Begusarai','Bhagalpur','Bhojpur','Buxar','Darbhanga','East Champaran','Gaya','Gopalganj','Jamui','Jehanabad','Kaimur','Katihar','Khagaria','Kishanganj','Lakhisarai','Madhepura','Madhubani','Munger','Muzaffarpur','Nalanda','Nawada','Patna','Purnia','Rohtas','Saharsa','Samastipur','Saran','Sheikhpura','Sheohar','Sitamarhi','Siwan','Supaul','Vaishali','West Champaran'
    ].map(d => ({ code: 'BR_' + d.substring(0,3).toUpperCase(), name: d, hq: d }))
  },
  {
    code: 'KA', name: 'Karnataka', type: 'state', capital: 'Bengaluru', zones: 4,
    districts: [
      'Bagalkot','Ballari','Belagavi','Bengaluru Rural','Bengaluru Urban','Bidar','Chamarajanagar','Chikkaballapur','Chikkamagaluru','Chitradurga','Dakshina Kannada','Davanagere','Dharwad','Gadag','Hassan','Haveri','Kalaburagi','Kodagu','Kolar','Koppal','Mandya','Mysuru','Raichur','Ramanagara','Shivamogga','Tumakuru','Udupi','Uttara Kannada','Vijayapura','Yadgir','Vijayanagara'
    ].map(d => ({ code: 'KA_' + d.substring(0,3).toUpperCase(), name: d, hq: d }))
  },
  {
    code: 'GJ', name: 'Gujarat', type: 'state', capital: 'Gandhinagar', zones: 5,
    districts: [
      'Ahmedabad','Amreli','Anand','Aravalli','Banaskantha','Bharuch','Bhavnagar','Botad','Chhota Udaipur','Dahod','Dang','Devbhoomi Dwarka','Gandhinagar','Gir Somnath','Jamnagar','Junagadh','Kheda','Kutch','Mahisagar','Mehsana','Morbi','Narmada','Navsari','Panchmahal','Patan','Porbandar','Rajkot','Sabarkantha','Surat','Surendranagar','Tapi','Vadodara','Valsad'
    ].map(d => ({ code: 'GJ_' + d.substring(0,3).toUpperCase(), name: d, hq: d }))
  },
  {
    code: 'WB', name: 'West Bengal', type: 'state', capital: 'Kolkata', zones: 5,
    districts: [
      'Alipurduar','Bankura','Birbhum','Cooch Behar','Dakshin Dinajpur','Darjeeling','Hooghly','Howrah','Jalpaiguri','Jhargram','Kalimpong','Kolkata','Malda','Murshidabad','Nadia','North 24 Parganas','Paschim Bardhaman','Paschim Medinipur','Purba Bardhaman','Purba Medinipur','Purulia','South 24 Parganas','Uttar Dinajpur'
    ].map(d => ({ code: 'WB_' + d.substring(0,3).toUpperCase(), name: d, hq: d }))
  },
  {
    code: 'AP', name: 'Andhra Pradesh', type: 'state', capital: 'Amaravati', zones: 4,
    districts: [
      'Alluri Sitharama Raju','Anakapalli','Ananthapuramu','Annamayya','Bapatla','Chittoor','Dr. B.R. Ambedkar Konaseema','East Godavari','Eluru','Guntur','Kakinada','Kurnool','Nandyal','NTR','Palnadu','Parvathipuram Manyam','Prakasam','Sri Potti Sriramulu Nellore','Sri Sathya Sai','Srikakulam','Tirupati','Visakhapatnam','Vizianagaram','West Godavari','Y.S.R.','Parvathipuram'
    ].map(d => ({ code: 'AP_' + d.substring(0,3).toUpperCase(), name: d, hq: d }))
  },
  {
    code: 'TS', name: 'Telangana', type: 'state', capital: 'Hyderabad', zones: 2,
    districts: [
      'Adilabad','Bhadradri Kothagudem','Hyderabad','Jagtial','Jangaon','Jayashankar Bhupalpally','Jogulamba Gadwal','Kamareddy','Karimnagar','Khammam','Komaram Bheem Asifabad','Mahabubabad','Mahabubnagar','Mancherial','Medak','Medchal-Malkajgiri','Mulugu','Nagarkurnool','Nalgonda','Narayanpet','Nirmal','Nizamabad','Peddapalli','Rajanna Sircilla','Ranga Reddy','Sangareddy','Siddipet','Suryapet','Vikarabad','Wanaparthy','Warangal','Hanamkonda','Yadadri Bhuvanagiri'
    ].map(d => ({ code: 'TS_' + d.substring(0,3).toUpperCase(), name: d, hq: d }))
  },
  {
    code: 'OD', name: 'Odisha', type: 'state', capital: 'Bhubaneswar', zones: 3,
    districts: [
      'Angul','Balangir','Balasore','Bargarh','Bhadrak','Boudh','Cuttack','Deogarh','Dhenkanal','Gajapati','Ganjam','Jagatsinghpur','Jajpur','Jharsuguda','Kalahandi','Kandhamal','Kendrapara','Kendujhar','Khordha','Koraput','Malkangiri','Mayurbhanj','Nabarangpur','Nayagarh','Nuapada','Puri','Rayagada','Sambalpur','Subarnapur','Sundargarh'
    ].map(d => ({ code: 'OD_' + d.substring(0,3).toUpperCase(), name: d, hq: d }))
  },
  {
    code: 'KL', name: 'Kerala', type: 'state', capital: 'Thiruvananthapuram', zones: 6,
    districts: [
      'Alappuzha','Ernakulam','Idukki','Kannur','Kasaragod','Kollam','Kottayam','Kozhikode','Malappuram','Palakkad','Pathanamthitta','Thiruvananthapuram','Thrissur','Wayanad'
    ].map(d => ({ code: 'KL_' + d.substring(0,3).toUpperCase(), name: d, hq: d }))
  },
  {
    code: 'PB', name: 'Punjab', type: 'state', capital: 'Chandigarh', zones: 5,
    districts: [
      'Amritsar','Barnala','Bathinda','Faridkot','Fatehgarh Sahib','Fazilka','Ferozepur','Gurdaspur','Hoshiarpur','Jalandhar','Kapurthala','Ludhiana','Mansa','Moga','Muktsar','Pathankot','Patiala','Rupnagar','Sahibzada Ajit Singh Nagar','Sangrur','Shahid Bhagat Singh Nagar','Sri Muktsar Sahib','Tarn Taran','Malerkotla'
    ].map(d => ({ code: 'PB_' + d.substring(0,3).toUpperCase(), name: d, hq: d }))
  },
  {
    code: 'HR', name: 'Haryana', type: 'state', capital: 'Chandigarh', zones: 6,
    districts: [
      'Ambala','Bhiwani','Charkhi Dadri','Faridabad','Fatehabad','Gurugram','Hisar','Jhajjar','Jind','Kaithal','Karnal','Kurukshetra','Mahendragarh','Nuh','Palwal','Panchkula','Panipat','Rewari','Rohtak','Sirsa','Sonipat','Yamunanagar'
    ].map(d => ({ code: 'HR_' + d.substring(0,3).toUpperCase(), name: d, hq: d }))
  },
  {
    code: 'JH', name: 'Jharkhand', type: 'state', capital: 'Ranchi', zones: 5,
    districts: [
      'Bokaro','Chatra','Deoghar','Dhanbad','Dumka','East Singhbhum','Garhwa','Giridih','Godda','Gumla','Hazaribagh','Jamtara','Khunti','Koderma','Latehar','Lohardaga','Pakur','Palamu','Ramgarh','Ranchi','Sahebganj','Seraikela Kharsawan','Simdega','West Singhbhum'
    ].map(d => ({ code: 'JH_' + d.substring(0,3).toUpperCase(), name: d, hq: d }))
  },
  {
    code: 'CG', name: 'Chhattisgarh', type: 'state', capital: 'Raipur', zones: 5,
    districts: [
      'Balod','Baloda Bazar','Balrampur','Bastar','Bemetara','Bijapur','Bilaspur','Dantewada','Dhamtari','Durg','Gariaband','Gaurela Pendra Marwahi','Janjgir-Champa','Jashpur','Kabirdham','Kanker','Kondagaon','Korba','Koriya','Mahasamund','Mungeli','Narayanpur','Raigarh','Raipur','Rajnandgaon','Sukma','Surajpur','Surguja','Manendragarh-Chirmiri-Bharatpur','Mohla-Manpur-Ambagarh Chowki','Sarangarh-Bilaigarh','Khairagarh-Chhuikhadan-Gandai','Sakti'
    ].map(d => ({ code: 'CG_' + d.substring(0,3).toUpperCase(), name: d, hq: d }))
  },
  {
    code: 'UK', name: 'Uttarakhand', type: 'state', capital: 'Dehradun', zones: 2,
    districts: [
      'Almora','Bageshwar','Chamoli','Champawat','Dehradun','Haridwar','Nainital','Pauri Garhwal','Pithoragarh','Rudraprayag','Tehri Garhwal','Udham Singh Nagar','Uttarkashi'
    ].map(d => ({ code: 'UK_' + d.substring(0,3).toUpperCase(), name: d, hq: d }))
  },
  {
    code: 'HP', name: 'Himachal Pradesh', type: 'state', capital: 'Shimla', zones: 3,
    districts: [
      'Bilaspur','Chamba','Hamirpur','Kangra','Kinnaur','Kullu','Lahaul and Spiti','Mandi','Shimla','Sirmaur','Solan','Una'
    ].map(d => ({ code: 'HP_' + d.substring(0,3).toUpperCase(), name: d, hq: d }))
  },
  {
    code: 'AS', name: 'Assam', type: 'state', capital: 'Dispur', zones: 5,
    districts: [
      'Baksa','Barpeta','Biswanath','Bongaigaon','Cachar','Charaideo','Chirang','Darrang','Dhemaji','Dhubri','Dibrugarh','Dima Hasao','Goalpara','Golaghat','Hailakandi','Hojai','Jorhat','Kamrup','Kamrup Metropolitan','Karbi Anglong','Karimganj','Kokrajhar','Lakhimpur','Majuli','Morigaon','Nagaon','Nalbari','Sivasagar','Sonitpur','South Salmara-Mankachar','Tinsukia','Udalguri','West Karbi Anglong','Bajali','Tamulpur'
    ].map(d => ({ code: 'AS_' + d.substring(0,3).toUpperCase(), name: d, hq: d }))
  },
  {
    code: 'AR', name: 'Arunachal Pradesh', type: 'state', capital: 'Itanagar', zones: 2,
    districts: [
      'Anjaw','Changlang','Dibang Valley','East Kameng','East Siang','Kamle','Kra Daadi','Kurung Kumey','Lepa Rada','Lohit','Longding','Lower Dibang Valley','Lower Siang','Lower Subansiri','Namsai','Pakke Kessang','Papum Pare','Shi Yomi','Siang','Tawang','Tirap','Upper Siang','Upper Subansiri','West Kameng','West Siang','Itanagar Capital Complex'
    ].map(d => ({ code: 'AR_' + d.substring(0,3).toUpperCase(), name: d, hq: d }))
  },
  {
    code: 'GA', name: 'Goa', type: 'state', capital: 'Panaji', zones: 2,
    districts: [
      'North Goa','South Goa'
    ].map(d => ({ code: 'GA_' + d.substring(0,3).toUpperCase(), name: d, hq: d }))
  },
  {
    code: 'MN', name: 'Manipur', type: 'state', capital: 'Imphal', zones: 2,
    districts: [
      'Bishnupur','Chandel','Churachandpur','Imphal East','Imphal West','Jiribam','Kakching','Kamjong','Kangpokpi','Noney','Pherzawl','Senapati','Tamenglong','Tengnoupal','Thoubal','Ukhrul'
    ].map(d => ({ code: 'MN_' + d.substring(0,3).toUpperCase(), name: d, hq: d }))
  },
  {
    code: 'ML', name: 'Meghalaya', type: 'state', capital: 'Shillong', zones: 3,
    districts: [
      'East Garo Hills','East Jaintia Hills','East Khasi Hills','North Garo Hills','Ri Bhoi','South Garo Hills','South West Garo Hills','South West Khasi Hills','West Garo Hills','West Jaintia Hills','West Khasi Hills','Eastern West Khasi Hills'
    ].map(d => ({ code: 'ML_' + d.substring(0,3).toUpperCase(), name: d, hq: d }))
  },
  {
    code: 'MZ', name: 'Mizoram', type: 'state', capital: 'Aizawl', zones: 3,
    districts: [
      'Aizawl','Champhai','Hnahthial','Khawzawl','Kolasib','Lawngtlai','Lunglei','Mamit','Saiha','Saitual','Serchhip'
    ].map(d => ({ code: 'MZ_' + d.substring(0,3).toUpperCase(), name: d, hq: d }))
  },
  {
    code: 'NL', name: 'Nagaland', type: 'state', capital: 'Kohima', zones: 1,
    districts: [
      'Chümoukedima','Dimapur','Kiphire','Kohima','Longleng','Mokokchung','Mon','Niuland','Noklak','Peren','Phek','Shamator','Tseminyü','Tuensang','Wokha','Zünheboto'
    ].map(d => ({ code: 'NL_' + d.substring(0,3).toUpperCase(), name: d, hq: d }))
  },
  {
    code: 'SK', name: 'Sikkim', type: 'state', capital: 'Gangtok', zones: 4,
    districts: [
      'Gangtok','Gyalshing','Mangan','Namchi','Pakyong','Soreng'
    ].map(d => ({ code: 'SK_' + d.substring(0,3).toUpperCase(), name: d, hq: d }))
  },
  {
    code: 'TR', name: 'Tripura', type: 'state', capital: 'Agartala', zones: 1,
    districts: [
      'Dhalai','Gomati','Khowai','North Tripura','Sepahijala','South Tripura','Unakoti','West Tripura'
    ].map(d => ({ code: 'TR_' + d.substring(0,3).toUpperCase(), name: d, hq: d }))
  },
  {
    code: 'AN', name: 'Andaman & Nicobar Islands', type: 'ut', capital: 'Port Blair', zones: 1,
    districts: [
      'Nicobar','North and Middle Andaman','South Andaman'
    ].map(d => ({ code: 'AN_' + d.substring(0,3).toUpperCase(), name: d, hq: d }))
  },
  {
    code: 'CH', name: 'Chandigarh', type: 'ut', capital: 'Chandigarh', zones: 1,
    districts: [
      'Chandigarh'
    ].map(d => ({ code: 'CH_' + d.substring(0,3).toUpperCase(), name: d, hq: d }))
  },
  {
    code: 'DD', name: 'Dadra & Nagar Haveli and Daman & Diu', type: 'ut', capital: 'Daman', zones: 1,
    districts: [
      'Dadra and Nagar Haveli','Daman','Diu'
    ].map(d => ({ code: 'DD_' + d.substring(0,3).toUpperCase(), name: d, hq: d }))
  },
  {
    code: 'DL', name: 'Delhi', type: 'ut', capital: 'New Delhi', zones: 11,
    districts: [
      'Central Delhi','East Delhi','New Delhi','North Delhi','North East Delhi','North West Delhi','Shahdara','South Delhi','South East Delhi','South West Delhi','West Delhi'
    ].map(d => ({ code: 'DL_' + d.substring(0,3).toUpperCase(), name: d, hq: d }))
  },
  {
    code: 'JK', name: 'Jammu & Kashmir', type: 'ut', capital: 'Srinagar', zones: 2,
    districts: [
      'Anantnag','Bandipora','Baramulla','Budgam','Doda','Ganderbal','Jammu','Kathua','Kishtwar','Kulgam','Kupwara','Poonch','Pulwama','Rajouri','Ramban','Reasi','Samba','Shopian','Srinagar','Udhampur'
    ].map(d => ({ code: 'JK_' + d.substring(0,3).toUpperCase(), name: d, hq: d }))
  },
  {
    code: 'LA', name: 'Ladakh', type: 'ut', capital: 'Leh', zones: 2,
    districts: [
      'Kargil','Leh'
    ].map(d => ({ code: 'LA_' + d.substring(0,3).toUpperCase(), name: d, hq: d }))
  },
  {
    code: 'LD', name: 'Lakshadweep', type: 'ut', capital: 'Kavaratti', zones: 1,
    districts: [
      'Lakshadweep'
    ].map(d => ({ code: 'LD_' + d.substring(0,3).toUpperCase(), name: d, hq: d }))
  },
  {
    code: 'PY', name: 'Puducherry', type: 'ut', capital: 'Puducherry', zones: 1,
    districts: [
      'Karaikal','Mahe','Puducherry','Yanam'
    ].map(d => ({ code: 'PY_' + d.substring(0,3).toUpperCase(), name: d, hq: d }))
  }
];

export const ALL_DISTRICTS = [];
STATES_AND_UTS.forEach(state => {
  state.districts.forEach(district => {
    ALL_DISTRICTS.push({
      stateCode: state.code,
      stateName: state.name,
      districtCode: district.code,
      districtName: district.name,
      hq: district.hq
    });
  });
});

export const STATE_LOOKUP = {};
export const DISTRICT_LOOKUP = {};

STATES_AND_UTS.forEach(state => {
  STATE_LOOKUP[state.code] = state;
  state.districts.forEach(district => {
    DISTRICT_LOOKUP[`${state.code}-${district.code}`] = district;
  });
});

export const TOTAL_STATES = STATES_AND_UTS.filter(s => s.type === 'state').length;
export const TOTAL_UTS = STATES_AND_UTS.filter(s => s.type === 'ut').length;
export const TOTAL_DISTRICTS = ALL_DISTRICTS.length;

export function getStateByCode(code) {
  return STATE_LOOKUP[code];
}

export function getDistrictsByState(stateCode) {
  const state = STATE_LOOKUP[stateCode];
  return state ? state.districts : [];
}

export function getDistrictByCode(stateCode, districtCode) {
  return DISTRICT_LOOKUP[`${stateCode}-${districtCode}`];
}

export function searchDistricts(query) {
  if (!query) return [];
  const lowerQuery = query.toLowerCase();
  return ALL_DISTRICTS.filter(d => 
    d.districtName.toLowerCase().includes(lowerQuery) || 
    d.stateName.toLowerCase().includes(lowerQuery)
  );
}
