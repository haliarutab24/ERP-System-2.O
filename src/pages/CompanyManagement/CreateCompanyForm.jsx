import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Building2, Mail, Phone, Image, Briefcase } from "lucide-react";

const industries = ["Technology", "Retail", "Manufacturing", "Finance", "Healthcare"];

const CreateCompany = () => {
    const [companyName, setCompanyName] = useState("");
    const [companyLogo, setCompanyLogo] = useState(null);
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [address, setAddress] = useState("");
    const [industry, setIndustry] = useState("");

    const handleFileChange = (e) => {
        setCompanyLogo(e.target.files[0]);
    };

    const handleSubmit = () => {
        if (!companyName) {
            toast.error("Company name is required!");
            return;
        }

        // Here you would send data to your API
        toast.success(`Company "${companyName}" created successfully!`);

        // Reset form
        setCompanyName("");
        setCompanyLogo(null);
        setEmail("");
        setContact("");
        setAddress("");
        setIndustry("");
    };

    return (
        <DashboardLayout>
            <div className="max-w-3xl mx-auto py-10">
                <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader className="border-b border-primary/20 pb-4">
                        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent flex items-center gap-2">
                            <Building2 className="w-5 h-5 text-primary" /> Create New Company
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 p-6">
                        {/* Company Name */}
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2 text-sm font-medium">
                                <Building2 className="w-4 h-4" /> Company Name <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                placeholder="Enter company name"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                className="border-2 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                            />
                        </div>

                        {/* Company Logo */}
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2 text-sm font-medium">
                                <Image className="w-4 h-4" /> Company Logo
                            </Label>
                            <Input
                                type="file"
                                accept=".jpg,.png,.svg"
                                onChange={handleFileChange}
                                className="border-2 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                            />
                            {companyLogo && <span className="text-sm text-muted-foreground">{companyLogo.name}</span>}
                        </div>

                        {/* Email & Contact */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="flex items-center gap-2 text-sm font-medium">
                                    <Mail className="w-4 h-4" /> Email
                                </Label>
                                <Input
                                    type="email"
                                    placeholder="company@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="border-2 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="flex items-center gap-2 text-sm font-medium">
                                    <Phone className="w-4 h-4" /> Contact
                                </Label>
                                <Input
                                    placeholder="+92 3XX XXXXXXX"
                                    value={contact}
                                    onChange={(e) => setContact(e.target.value)}
                                    className="border-2 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                                />
                            </div>
                        </div>

                        {/* Address */}
                        <div className="space-y-2">
                            <Label className="text-sm font-medium flex items-center gap-2">
                                Address
                            </Label>
                            <Textarea
                                placeholder="Enter company address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="border-2 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                            />
                        </div>

                        {/* Industry / Type */}
                        <div className="space-y-2">
                            <Label className="text-sm font-medium flex items-center gap-2">
                                <Briefcase className="w-4 h-4" /> Industry / Type
                            </Label>
                            <Select value={industry} onValueChange={setIndustry}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select industry" />
                                </SelectTrigger>
                                <SelectContent>
                                    {industries.map((ind) => (
                                        <SelectItem key={ind} value={ind}>{ind}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Submit Button */}
                        <Button
                            className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-200 py-3 text-base font-medium"
                            onClick={handleSubmit}
                        >
                            Save Company
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default CreateCompany;
