import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Building2, ArrowRight } from "lucide-react";

const mockCompanies = [
    {
        id: 1,
        logo: "https://ui-avatars.com/api/?name=Tech+Corp",
        name: "Tech Corp Solutions",
        role: "Admin",
    },
    {
        id: 2,
        logo: "https://ui-avatars.com/api/?name=Bright+Retail",
        name: "Bright Retail Pvt Ltd",
        role: "Salesman",
    },
    {
        id: 3,
        logo: "https://ui-avatars.com/api/?name=Alpha+Enterprises",
        name: "Alpha Enterprises",
        role: "Manager",
    },
];

const CompanySwitcher = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentCompany, setCurrentCompany] = useState(mockCompanies[0]);

    const handleSwitchCompany = (company) => {
        setCurrentCompany(company);
        setIsOpen(false);
        // You can trigger actual switch logic here
        console.log(`Switched to company: ${company.name}`);
    };

    return (
        <DashboardLayout>
            <div className="flex justify-center items-center h-full py-10">
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-200 py-3 px-6 flex items-center gap-2">
                            <Users className="w-5 h-5" /> Switch Company
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md bg-background/95 backdrop-blur-sm border-0 shadow-2xl p-6">
                        <DialogHeader className="border-b border-border/50 pb-3 mb-4">
                            <DialogTitle className="text-xl font-semibold flex items-center gap-2 text-foreground">
                                <Building2 className="w-5 h-5 text-primary" /> Switch Company
                            </DialogTitle>
                        </DialogHeader>

                        <div className="space-y-4">
                            {mockCompanies.map((company) => (
                                <Card
                                    key={company.id}
                                    className={`flex items-center justify-between p-4 shadow-md hover:shadow-xl transition-all duration-300 rounded-lg cursor-pointer ${company.id === currentCompany.id
                                        ? "bg-primary/10 border border-primary/30"
                                        : "bg-background"
                                        }`}
                                    onClick={() => handleSwitchCompany(company)}
                                >
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={company.logo}
                                            alt={company.name}
                                            className="w-10 h-10 rounded-full border"
                                        />
                                        <div className="flex flex-col">
                                            <span className="font-medium text-foreground">{company.name}</span>
                                            <Badge
                                                variant="secondary"
                                                className={`text-sm ${company.role === "Admin"
                                                    ? "bg-blue-100 text-blue-700 border-blue-200"
                                                    : company.role === "Manager"
                                                        ? "bg-amber-100 text-amber-700 border-amber-200"
                                                        : "bg-green-100 text-green-700 border-green-200"
                                                    }`}
                                            >
                                                {company.role}
                                            </Badge>
                                        </div>
                                    </div>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        className="h-8 w-8 p-0 hover:bg-primary/10 rounded-lg"
                                    >
                                        <ArrowRight className="w-4 h-4 text-primary" />
                                    </Button>
                                </Card>
                            ))}
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </DashboardLayout>
    );
};

export default CompanySwitcher;
