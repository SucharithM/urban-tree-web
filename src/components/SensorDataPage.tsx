import {
  Activity,
  MapPin,
  User,
  Layers,
  Battery,
  Thermometer,
  Droplets,
  Gauge,
  TreeDeciduous,
  Zap,
  Database,
  Download,
} from "lucide-react";
import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import axios from "axios";
import { IntlProvider, FormattedMessage } from "react-intl";
import messages_en from "../app/locales/en.json";
import messages_es from "../app/locales/es.json";
import { useSelector, useDispatch } from 'react-redux';

type Trend = "up" | "down" | "steady";
interface SensorReading {
  value: number;
  unit: string;
  change: string;
  trend: Trend;
}
interface HistoryEntry {
  time: string;
  value: number;
}
interface NodeData {
  currentReadings: {
    temperature: SensorReading;
    pressure: SensorReading;
    humidity: SensorReading;
    dendrometer: SensorReading;
    sapflow: SensorReading;
    battery: SensorReading;
  };
  temperatureHistory: HistoryEntry[];
  pressureHistory: HistoryEntry[];
  humidityHistory: HistoryEntry[];
  dendrometerHistory: HistoryEntry[];
  sapflowHistory: HistoryEntry[];
  batteryHistory: HistoryEntry[];
}

export function SensorDataPage() {
  const [selectedNode, setSelectedNode] = useState("node1");
  const [currentData, setCurrentData] = useState({});
  const [result, setResult] = useState({
    node1: {
      temperatureHistory: [],
      pressureHistory: [],
      humidityHistory: [],
      dendrometerHistory: [],
      sapflowHistory: [],
      batteryHistory: [],
      sf_noise: [],
      sf_maxD: []

    }
  });
  debugger

  const locale = useSelector(state => state.locale.value)
  const dispatch = useDispatch()

  // const [locale, setLocale] = useState("en");

  const messages = {
    en: messages_en,
    es: messages_es
  }

  useEffect(() => {
    // Make GET request to fetch data
    axios
      .get("http://localhost:8000/treeData/")
      .then((response) => {
        debugger
        console.log('Count has changed:');
        // setNodeData(response.data);
        let parsed_data = convertSensorData(response.data);
        setCurrentData(parsed_data);
        console.log(JSON.stringify(currentData, null, 2));
      })
      .catch((err) => {
        console.log(err)
      });
  }, []);

  const nodes = [
    {
      id: "node1",
      name: "HF Witness",
      location: "38.7456°N, 92.3289°W",
      sensorDepths: "10cm, 30cm, 50cm",
      pi: "Dr. Sarah Chen",
      status: "active",
    }
    // {
    //   id: "node2",
    //   name: "Pine Valley Site",
    //   location: "38.7512°N, 92.3145°W",
    //   sensorDepths: "15cm, 35cm, 60cm",
    //   pi: "Dr. James Martinez",
    //   status: "active",
    // },
    // {
    //   id: "node3",
    //   name: "Maple Creek Point",
    //   location: "38.7389°N, 92.3401°W",
    //   sensorDepths: "10cm, 25cm, 45cm",
    //   pi: "Dr. Emily Thompson",
    //   status: "active",
    // },
    // {
    //   id: "node4",
    //   name: "Birch Forest Hub",
    //   location: "38.7623°N, 92.3198°W",
    //   sensorDepths: "12cm, 30cm, 55cm",
    //   pi: "Dr. Michael Park",
    //   status: "maintenance",
    // },
  ];

  function convertSensorData(rawData) {

    const result = {
    node1: {
      temperatureHistory: [],
      pressureHistory: [],
      humidityHistory: [],
      dendrometerHistory: [],
      sapflowHistory: [],
      batteryHistory: [],
      sf_noise: [],
      sf_maxD: []
    }
  };
    // Parse the JSON if it's a string
    const data = typeof rawData === 'string' ? JSON.parse(rawData) : rawData;

    // Initialize result object with empty arrays

    Object.entries(data["Dendro"]).forEach(([key, value]) => {
      // debugger
      result.node1.dendrometerHistory.push({
        // time: timeStamp_data[i],
        value: parseFloat(value)
      });
    })

    Object.entries(data["Humidity"]).forEach(([key, value]) => {
      // debugger
      result.node1.humidityHistory.push({
        // time: timeStamp_data[i],
        value: parseFloat(value)
      });

    })

    Object.entries(data["Pressure"]).forEach(([key, value]) => {
      // debugger
      result.node1.pressureHistory.push({
        // time: timeStamp_data[i]
        value: parseFloat(value)
      });

    })

    Object.entries(data["SF_Noise"]).forEach(([key, value]) => {
      // debugger
      result.node1.sf_noise.push({
        // time: timeStamp_data[i]
        value: parseFloat(value)
      });

    })

    Object.entries(data["SF_maxD"]).forEach(([key, value]) => {
      // debugger
      result.node1.sf_maxD.push({
        // time: timeStamp_data[i]
        value: parseFloat(value)
      });

    })

    Object.entries(data["Sapflow"]).forEach(([key, value]) => {
      // debugger
      result.node1.sapflowHistory.push({
        // time: timeStamp_data[i]
        value: parseFloat(value)
      });

    })

    Object.entries(data["Temperature"]).forEach(([key, value]) => {
      // debugger
      result.node1.temperatureHistory.push({
        // time: timeStamp_data[i]
        value: parseFloat(value)
      });

    })

    Object.entries(data["Timestamp"]).forEach(([key, value]) => {
      result.node1.temperatureHistory[key]["time"] = value

      result.node1.sapflowHistory[key]["time"] = value

      result.node1.sf_maxD[key]["time"] = value

      result.node1.sf_noise[key]["time"] = value

      result.node1.pressureHistory[key]["time"] = value

      result.node1.humidityHistory[key]["time"] = value

      result.node1.dendrometerHistory[key]["time"] = value
    });

    console.log(result.node1 + " ")
    return result.node1;
  }

  const nodeData: Record<string, NodeData> = {
    node1: {
      currentReadings: {
        temperature: { value: 21.4, unit: "°C", change: "+2.3", trend: "up" },
        pressure: { value: 1013.2, unit: "hPa", change: "-1.5", trend: "down" },
        humidity: { value: 65, unit: "%", change: "-3", trend: "down" },
        dendrometer: { value: 145.8, unit: "mm", change: "+0.2", trend: "up" },
        sapflow: { value: 12.4, unit: "g/hr", change: "+1.8", trend: "up" },
        battery: { value: 87, unit: "%", change: "-2", trend: "down" },
      },
      temperatureHistory: [
        { time: "00:00", value: 18.2 },
        { time: "04:00", value: 16.8 },
        { time: "08:00", value: 19.5 },
        { time: "12:00", value: 24.3 },
        { time: "16:00", value: 26.1 },
        { time: "20:00", value: 21.4 },
      ],
      pressureHistory: [
        { time: "00:00", value: 1015.2 },
        { time: "04:00", value: 1014.8 },
        { time: "08:00", value: 1014.1 },
        { time: "12:00", value: 1013.5 },
        { time: "16:00", value: 1013.0 },
        { time: "20:00", value: 1013.2 },
      ],
      humidityHistory: [
        { time: "00:00", value: 72 },
        { time: "04:00", value: 78 },
        { time: "08:00", value: 68 },
        { time: "12:00", value: 58 },
        { time: "16:00", value: 52 },
        { time: "20:00", value: 65 },
      ],
      dendrometerHistory: [
        { time: "00:00", value: 145.3 },
        { time: "04:00", value: 145.4 },
        { time: "08:00", value: 145.5 },
        { time: "12:00", value: 145.6 },
        { time: "16:00", value: 145.7 },
        { time: "20:00", value: 145.8 },
      ],
      sapflowHistory: [
        { time: "00:00", value: 8.2 },
        { time: "04:00", value: 7.1 },
        { time: "08:00", value: 9.8 },
        { time: "12:00", value: 13.5 },
        { time: "16:00", value: 14.2 },
        { time: "20:00", value: 12.4 },
      ],
      batteryHistory: [
        { time: "00:00", value: 91 },
        { time: "04:00", value: 90 },
        { time: "08:00", value: 89 },
        { time: "12:00", value: 88 },
        { time: "16:00", value: 88 },
        { time: "20:00", value: 87 },
      ],
    },
    node2: {
      currentReadings: {
        temperature: { value: 19.8, unit: "°C", change: "+1.5", trend: "up" },
        pressure: { value: 1012.8, unit: "hPa", change: "-0.8", trend: "down" },
        humidity: { value: 71, unit: "%", change: "+2", trend: "up" },
        dendrometer: { value: 152.3, unit: "mm", change: "+0.3", trend: "up" },
        sapflow: { value: 10.8, unit: "g/hr", change: "+1.2", trend: "up" },
        battery: { value: 92, unit: "%", change: "-1", trend: "down" },
      },
      temperatureHistory: [
        { time: "00:00", value: 17.5 },
        { time: "04:00", value: 15.9 },
        { time: "08:00", value: 18.2 },
        { time: "12:00", value: 22.1 },
        { time: "16:00", value: 23.8 },
        { time: "20:00", value: 19.8 },
      ],
      pressureHistory: [
        { time: "00:00", value: 1014.1 },
        { time: "04:00", value: 1013.8 },
        { time: "08:00", value: 1013.2 },
        { time: "12:00", value: 1012.9 },
        { time: "16:00", value: 1012.6 },
        { time: "20:00", value: 1012.8 },
      ],
      humidityHistory: [
        { time: "00:00", value: 68 },
        { time: "04:00", value: 74 },
        { time: "08:00", value: 65 },
        { time: "12:00", value: 62 },
        { time: "16:00", value: 59 },
        { time: "20:00", value: 71 },
      ],
      dendrometerHistory: [
        { time: "00:00", value: 151.7 },
        { time: "04:00", value: 151.9 },
        { time: "08:00", value: 152.0 },
        { time: "12:00", value: 152.1 },
        { time: "16:00", value: 152.2 },
        { time: "20:00", value: 152.3 },
      ],
      sapflowHistory: [
        { time: "00:00", value: 7.5 },
        { time: "04:00", value: 6.8 },
        { time: "08:00", value: 8.9 },
        { time: "12:00", value: 12.2 },
        { time: "16:00", value: 13.1 },
        { time: "20:00", value: 10.8 },
      ],
      batteryHistory: [
        { time: "00:00", value: 94 },
        { time: "04:00", value: 94 },
        { time: "08:00", value: 93 },
        { time: "12:00", value: 93 },
        { time: "16:00", value: 92 },
        { time: "20:00", value: 92 },
      ],
    },
    node3: {
      currentReadings: {
        temperature: { value: 20.6, unit: "°C", change: "+1.9", trend: "up" },
        pressure: { value: 1014.1, unit: "hPa", change: "-1.2", trend: "down" },
        humidity: { value: 68, unit: "%", change: "-1", trend: "down" },
        dendrometer: { value: 138.9, unit: "mm", change: "+0.1", trend: "up" },
        sapflow: { value: 11.7, unit: "g/hr", change: "+1.5", trend: "up" },
        battery: { value: 84, unit: "%", change: "-3", trend: "down" },
      },
      temperatureHistory: [
        { time: "00:00", value: 17.9 },
        { time: "04:00", value: 16.2 },
        { time: "08:00", value: 18.8 },
        { time: "12:00", value: 23.5 },
        { time: "16:00", value: 25.2 },
        { time: "20:00", value: 20.6 },
      ],
      pressureHistory: [
        { time: "00:00", value: 1016.0 },
        { time: "04:00", value: 1015.5 },
        { time: "08:00", value: 1015.1 },
        { time: "12:00", value: 1014.6 },
        { time: "16:00", value: 1014.2 },
        { time: "20:00", value: 1014.1 },
      ],
      humidityHistory: [
        { time: "00:00", value: 70 },
        { time: "04:00", value: 76 },
        { time: "08:00", value: 66 },
        { time: "12:00", value: 60 },
        { time: "16:00", value: 56 },
        { time: "20:00", value: 68 },
      ],
      dendrometerHistory: [
        { time: "00:00", value: 138.4 },
        { time: "04:00", value: 138.5 },
        { time: "08:00", value: 138.6 },
        { time: "12:00", value: 138.7 },
        { time: "16:00", value: 138.8 },
        { time: "20:00", value: 138.9 },
      ],
      sapflowHistory: [
        { time: "00:00", value: 7.8 },
        { time: "04:00", value: 6.9 },
        { time: "08:00", value: 9.2 },
        { time: "12:00", value: 12.8 },
        { time: "16:00", value: 13.5 },
        { time: "20:00", value: 11.7 },
      ],
      batteryHistory: [
        { time: "00:00", value: 89 },
        { time: "04:00", value: 88 },
        { time: "08:00", value: 87 },
        { time: "12:00", value: 86 },
        { time: "16:00", value: 85 },
        { time: "20:00", value: 84 },
      ],
    },
    node4: {
      currentReadings: {
        temperature: { value: 22.1, unit: "°C", change: "+2.8", trend: "up" },
        pressure: { value: 1013.5, unit: "hPa", change: "-0.9", trend: "down" },
        humidity: { value: 62, unit: "%", change: "-4", trend: "down" },
        dendrometer: { value: 149.2, unit: "mm", change: "+0.2", trend: "up" },
        sapflow: { value: 13.2, unit: "g/hr", change: "+2.1", trend: "up" },
        battery: { value: 76, unit: "%", change: "-5", trend: "down" },
      },
      temperatureHistory: [
        { time: "00:00", value: 18.5 },
        { time: "04:00", value: 17.1 },
        { time: "08:00", value: 20.1 },
        { time: "12:00", value: 25.0 },
        { time: "16:00", value: 26.8 },
        { time: "20:00", value: 22.1 },
      ],
      pressureHistory: [
        { time: "00:00", value: 1015.1 },
        { time: "04:00", value: 1014.7 },
        { time: "08:00", value: 1014.2 },
        { time: "12:00", value: 1013.8 },
        { time: "16:00", value: 1013.4 },
        { time: "20:00", value: 1013.5 },
      ],
      humidityHistory: [
        { time: "00:00", value: 71 },
        { time: "04:00", value: 77 },
        { time: "08:00", value: 67 },
        { time: "12:00", value: 57 },
        { time: "16:00", value: 51 },
        { time: "20:00", value: 62 },
      ],
      dendrometerHistory: [
        { time: "00:00", value: 148.6 },
        { time: "04:00", value: 148.7 },
        { time: "08:00", value: 148.9 },
        { time: "12:00", value: 149.0 },
        { time: "16:00", value: 149.1 },
        { time: "20:00", value: 149.2 },
      ],
      sapflowHistory: [
        { time: "00:00", value: 8.5 },
        { time: "04:00", value: 7.3 },
        { time: "08:00", value: 10.2 },
        { time: "12:00", value: 14.1 },
        { time: "16:00", value: 14.9 },
        { time: "20:00", value: 13.2 },
      ],
      batteryHistory: [
        { time: "00:00", value: 85 },
        { time: "04:00", value: 83 },
        { time: "08:00", value: 81 },
        { time: "12:00", value: 79 },
        { time: "16:00", value: 77 },
        { time: "20:00", value: 76 },
      ],
    },
  };

  const datasets = [
    {
      name: "Temperature & Humidity Archive",
      period: "2020-2024",
      size: "2.4 GB",
      records: "~8.5M readings",
      format: "CSV, NetCDF",
    },
    {
      name: "CO2 Flux Measurements",
      period: "2020-2024",
      size: "1.8 GB",
      records: "~6.2M readings",
      format: "CSV, HDF5",
    },
    {
      name: "Soil Moisture Data",
      period: "2021-2024",
      size: "980 MB",
      records: "~3.1M readings",
      format: "CSV",
    },
    {
      name: "Meteorological Data",
      period: "2020-2024",
      size: "3.2 GB",
      records: "~12M readings",
      format: "CSV, NetCDF",
    },
  ];

  if (!currentData) {
    return <div>Loading...</div>;
  }
  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-primary text-primary-foreground py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Activity className="w-16 h-16 mx-auto mb-4" />

            <h1 className="text-4xl md:text-5xl mb-4"><FormattedMessage id="Sensor Data Visualization" /></h1>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto">
              <FormattedMessage id="Real-time environmental monitoring and historical data archives" />
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Tabs defaultValue="live" className="space-y-8">
            <TabsList className="grid w-md max-w-md mx-auto grid-cols-1">
              <TabsTrigger value="live"><FormattedMessage id="Live Dashboard" /></TabsTrigger>
            </TabsList>

            {/* Live Dashboard */}
            <TabsContent value="live" className="space-y-8">
              {/* Node Selector */}
              <div>
                <h2 className="text-3xl mb-6"><FormattedMessage id="Select Sensor Node" /></h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {nodes.map((node) => (
                    <Card
                      key={node.id}
                      onClick={() => setSelectedNode(node.id)}
                      className={`p-6 cursor-pointer transition-all border-2 ${selectedNode === node.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                        }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-foreground">{node.id.toUpperCase()}</h3>
                        <Badge
                          variant={node.status === "active" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {node.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{node.name}</p>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Node Information 
              <div>
                <h2 className="text-3xl mb-6">{currentNode.name}</h2>
                <Card className="p-6 border-border">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-muted-foreground mb-1"><FormattedMessage id="Location" /></p>
                        <p className="text-foreground">{currentNode.location}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Layers className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-muted-foreground mb-1"><FormattedMessage id="Sensor Depths" /></p>
                        <p className="text-foreground">{currentNode.sensorDepths}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <User className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-muted-foreground mb-1"><FormattedMessage id="Principal Investigator" /></p>
                        <p className="text-foreground">{currentNode.pi}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Activity className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Status</p>
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-2 h-2 rounded-full ${currentNode.status === "active" ? "bg-green-500" : "bg-yellow-500"}`}
                          />
                          <p className="text-foreground capitalize">{currentNode.status}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
              */}

              {/* Status Indicator */}
              <div className="flex items-center justify-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                <span className="text-muted-foreground"><FormattedMessage id="Live data updating every 30 seconds" /></span>
              </div>

              {/* Temperature Chart */}
              <div>
                <h2 className="text-3xl mb-6"><FormattedMessage id="Temperature - Last 24 Hours" /></h2>
                <Card className="p-6 border-border">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={currentData.temperatureHistory}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#3d5a3c"
                        strokeWidth={2}
                        name="Temperature (°C)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Card>
              </div>

              {/* Pressure Chart */}
              <div>
                <h2 className="text-3xl mb-6"><FormattedMessage id="Pressure - Last 24 Hours" /></h2>
                <Card className="p-6 border-border">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={currentData.pressureHistory}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#8b7355"
                        strokeWidth={2}
                        name="Pressure (hPa)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Card>
              </div>

              {/* Humidity Chart */}
              <div>
                <h2 className="text-3xl mb-6"><FormattedMessage id="Humidity - Last 24 Hours" /></h2>
                <Card className="p-6 border-border">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={currentData.humidityHistory}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#6b8e6b"
                        strokeWidth={2}
                        name="Humidity (%)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Card>
              </div>

              {/* Dendrometer Chart */}
              <div>
                <h2 className="text-3xl mb-6"><FormattedMessage id="Dendrometer - Last 24 Hours" /></h2>
                <Card className="p-6 border-border">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={currentData.dendrometerHistory}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#3d5a3c"
                        strokeWidth={2}
                        name="Dendrometer (mm)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Card>
              </div>

              {/* Sap Flow Chart */}
              <div>
                <h2 className="text-3xl mb-6"><FormattedMessage id="Sap Flow - Last 24 Hours" /></h2>
                <Card className="p-6 border-border">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={currentData.sapflowHistory}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#8b7355"
                        strokeWidth={2}
                        name="Sap Flow (g/hr)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Card>
              </div>

              {/* Battery Chart */}
              <div>
                <h2 className="text-3xl mb-6"><FormattedMessage id="Battery Level - Last 24 Hours" /></h2>
                <Card className="p-6 border-border">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={currentData.batteryHistory}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#6b8e6b"
                        strokeWidth={2}
                        name="Battery (%)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Card>
              </div>
            </TabsContent>

            {/* Data Catalog */}
            <TabsContent value="catalog" className="space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <Database className="w-8 h-8 text-primary" />
                  <h2 className="text-3xl"><FormattedMessage id="Historical Data Archive" /></h2>
                </div>
                <p className="text-muted-foreground mb-8">
                  Access our comprehensive archive of environmental sensor data. All datasets are
                  available for download in multiple formats for research and educational purposes.
                </p>

                <div className="space-y-4">
                  {datasets.map((dataset, index) => (
                    <Card key={index} className="p-6 border-border hover:shadow-lg transition-shadow">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-foreground mb-3">{dataset.name}</h3>
                          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground mb-1"><FormattedMessage id="Time Period" /></p>
                              <p className="text-foreground">{dataset.period}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground mb-1"><FormattedMessage id="Dataset Size" /></p>
                              <p className="text-foreground">{dataset.size}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground mb-1"><FormattedMessage id="Total Records" /></p>
                              <p className="text-foreground">{dataset.records}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground mb-1"><FormattedMessage id="File Formats" /></p>
                              <p className="text-foreground">{dataset.format}</p>
                            </div>
                          </div>
                        </div>
                        <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors flex-shrink-0">
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Data Access Information */}
              <div className="bg-primary/5 rounded-lg p-8 border border-border">
                <h3 className="text-2xl mb-4">Data Access & Usage</h3>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    Our data is freely available for research and educational purposes under a
                    Creative Commons Attribution 4.0 International License.
                  </p>
                  <p>
                    If you use this data in your research, please cite our dataset and publications.
                    We also encourage you to contact us about your research - we'd love to hear how
                    our data is being used!
                  </p>
                  <p>
                    For questions about data access, formats, or metadata, please contact our data
                    manager at
                    <a href="mailto:data@lab.edu" className="underline">
                      data@lab.edu
                    </a>
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Footer */}
        <footer className="bg-primary text-primary-foreground mt-16 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm">
              © 2024 Prof. Joy Winbourne Environmental Research Lab. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </IntlProvider>
  );
}