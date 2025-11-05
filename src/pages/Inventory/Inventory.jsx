import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Search, Eye, Download } from "lucide-react";
import { toast } from "sonner";

const mockInventory = [
  { id: 1, name: "Product A", category: "Electronics", unit: "PCS", qty: 120, rate: 500, supplier: "Supplier 1" },
  { id: 2, name: "Product B", category: "Clothing", unit: "PCS", qty: 85, rate: 300, supplier: "Supplier 2" },
  { id: 3, name: "Product C", category: "Food", unit: "KG", qty: 200, rate: 150, supplier: "Supplier 3" },
];

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [fifoData, setFifoData] = useState(null);

  const filteredInventory = mockInventory.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewFifo = (item) => {
    setFifoData({
      itemName: item.name,
      layers: [
        { batchId: "B001", date: "2024-01-15", qty: 50, rate: 480 },
        { batchId: "B002", date: "2024-02-10", qty: 70, rate: 500 },
      ],
    });
  };

  const handleDownload = () => {
    toast.success("Inventory report downloaded!");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Inventory Management</h1>
            <p className="text-muted-foreground">Manage your stock with FIFO tracking</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleDownload}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Item
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Inventory Item</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label>Item Name</Label>
                    <Input placeholder="Enter item name" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Input placeholder="Category" />
                    </div>
                    <div className="space-y-2">
                      <Label>Unit</Label>
                      <Input placeholder="PCS, KG, etc." />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Quantity</Label>
                      <Input type="number" placeholder="0" />
                    </div>
                    <div className="space-y-2">
                      <Label>Rate</Label>
                      <Input type="number" placeholder="0.00" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Supplier</Label>
                    <Input placeholder="Supplier name" />
                  </div>
                  <Button className="w-full" onClick={() => {
                    toast.success("Item added successfully!");
                    setIsAddOpen(false);
                  }}>
                    Add Item
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search inventory..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Inventory Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium">Item Name</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Category</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Unit</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Quantity</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Rate</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Supplier</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredInventory.map((item) => (
                    <tr key={item.id} className="hover:bg-muted/30">
                      <td className="px-4 py-3 font-medium">{item.name}</td>
                      <td className="px-4 py-3">{item.category}</td>
                      <td className="px-4 py-3">{item.unit}</td>
                      <td className="px-4 py-3">{item.qty}</td>
                      <td className="px-4 py-3">PKR {item.rate}</td>
                      <td className="px-4 py-3">{item.supplier}</td>
                      <td className="px-4 py-3">
                        <Button size="sm" variant="ghost" onClick={() => handleViewFifo(item)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* FIFO Layer View */}
        {fifoData && (
          <Dialog open={!!fifoData} onOpenChange={() => setFifoData(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>FIFO Layers - {fifoData.itemName}</DialogTitle>
              </DialogHeader>
              <div className="space-y-2">
                {fifoData.layers.map((layer) => (
                  <Card key={layer.batchId}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Batch {layer.batchId}</p>
                          <p className="text-sm text-muted-foreground">{layer.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{layer.qty} units</p>
                          <p className="text-sm text-muted-foreground">PKR {layer.rate}/unit</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Inventory;
