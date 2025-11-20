import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Users, CreditCard } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ReservationForm = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const API_KEY = atob(import.meta.env.VITE_API_KEY);
    console.log(API_URL);
    console.log("KEY: ", API_KEY);

    const [formData, setFormData] = useState({
        reservedAt: new Date().toISOString(),
        date: "",
        time: "",
        duration: "",
        guests: "4",
        eventType: "",
        notes: "",
        cardNumber: "1234 5678 9012 3456",
        expiry: "10/32",
        cvv: "792",
        cardholderName: "Gordon Ramsay",
    });
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const current = await fetch(API_URL, {
            headers: {
                "X-Master-Key": API_KEY,
            },
        }).then((res) => res.json());

        const updated = {
            reservas: [...current.record.reservas, formData],
        };

        await fetch(API_URL, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-Master-Key": API_KEY,
            },
            body: JSON.stringify(updated),
        });

        toast.success("Reserva confirmada correctamente");
        setTimeout(() => {
            navigate("/thanks");
        }, 100);
    };

    const fillAndSubmit = () => {
        setFormData({
            reservedAt: new Date().toLocaleString("es-CO"),
            date: "2025-12-20",
            time: "14:00",
            duration: "3",
            guests: "8",
            eventType: "default",
            notes: "Evento de prueba generado automáticamente",
            cardNumber: "1234 5678 9012 3456",
            expiry: "10/32",
            cvv: "792",
            cardholderName: "Gordon Ramsay",
        });

        // Espera un pequeño tiempo para que React actualice el estado
        setTimeout(() => {
            document
                .querySelector("form")
                ?.dispatchEvent(
                    new Event("submit", { cancelable: true, bubbles: true })
                );
        }, 100);
    };

    return (
        <div className="min-h-screen bg-background py-8 px-4">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-6">
                        <span className="font-semibold text-foreground">
                            MISKA
                        </span>
                    </div>

                    <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                        Confirmar reserva
                    </h1>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={fillAndSubmit}
                        className="text-sm mb-5"
                    >
                        Autollenar & Enviar
                    </Button>

                    <p className="text-muted-foreground text-sm md:text-base">
                        Completa los detalles de tu reserva
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Date and Time Section */}
                    <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
                        <div className="flex items-center gap-2 mb-6">
                            <Calendar className="w-5 h-5 text-primary" />
                            <h2 className="text-lg font-semibold text-foreground">
                                Fecha y hora
                            </h2>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <Label
                                    htmlFor="date"
                                    className="text-foreground"
                                >
                                    Fecha *
                                </Label>
                                <Input
                                    id="date"
                                    type="date"
                                    value={formData.date}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            date: e.target.value,
                                        })
                                    }
                                    required
                                    className="mt-1.5"
                                />
                            </div>

                            <div>
                                <Label
                                    htmlFor="time"
                                    className="text-foreground"
                                >
                                    Hora de inicio *
                                </Label>
                                <Input
                                    id="time"
                                    type="time"
                                    value={formData.time}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            time: e.target.value,
                                        })
                                    }
                                    required
                                    className="mt-1.5"
                                />
                            </div>

                            <div>
                                <Label
                                    htmlFor="duration"
                                    className="text-foreground"
                                >
                                    Duración (horas) *
                                </Label>
                                <Select
                                    value={formData.duration}
                                    onValueChange={(value) =>
                                        setFormData({
                                            ...formData,
                                            duration: value,
                                        })
                                    }
                                >
                                    <SelectTrigger className="mt-1.5">
                                        <SelectValue placeholder="Selecciona" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">
                                            1 hora
                                        </SelectItem>
                                        <SelectItem value="2">
                                            2 horas
                                        </SelectItem>
                                        <SelectItem value="3">
                                            3 horas
                                        </SelectItem>
                                        <SelectItem value="4">
                                            4 horas
                                        </SelectItem>
                                        <SelectItem value="5">
                                            5 horas
                                        </SelectItem>
                                        <SelectItem value="6">
                                            6 horas
                                        </SelectItem>
                                        <SelectItem value="7">
                                            7 horas
                                        </SelectItem>
                                        <SelectItem value="8">
                                            8 horas
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    {/* Event Details Section */}
                    <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
                        <div className="flex items-center gap-2 mb-6">
                            <Users className="w-5 h-5 text-primary" />
                            <h2 className="text-lg font-semibold text-foreground">
                                Detalles del evento
                            </h2>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <Label
                                    htmlFor="guests"
                                    className="text-foreground"
                                >
                                    Número de personas
                                </Label>
                                <Input
                                    id="guests"
                                    type="number"
                                    min="1"
                                    value={formData.guests}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            guests: e.target.value,
                                        })
                                    }
                                    className="mt-1.5"
                                />
                            </div>

                            <div>
                                <Label
                                    htmlFor="eventType"
                                    className="text-foreground"
                                >
                                    Tipo de evento
                                </Label>
                                <Select
                                    value={formData.eventType}
                                    onValueChange={(value) =>
                                        setFormData({
                                            ...formData,
                                            eventType: value,
                                        })
                                    }
                                >
                                    <SelectTrigger className="mt-1.5">
                                        <SelectValue placeholder="Selecciona" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="default">
                                            Por defecto
                                        </SelectItem>
                                        <SelectItem value="emprendimiento">
                                            Emprendimiento
                                        </SelectItem>
                                        <SelectItem value="prueba-concepto">
                                            Prueba de concepto de producto
                                        </SelectItem>
                                        <SelectItem value="academico">
                                            Proyecto académico
                                        </SelectItem>
                                        <SelectItem value="produccion-masa">
                                            Producción en masa
                                        </SelectItem>
                                        <SelectItem value="otro">
                                            Otro
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label
                                    htmlFor="notes"
                                    className="text-foreground"
                                >
                                    Notas adicionales
                                </Label>
                                <Textarea
                                    id="notes"
                                    placeholder="Describe tu evento o necesidades especiales..."
                                    value={formData.notes}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            notes: e.target.value,
                                        })
                                    }
                                    className="mt-1.5 min-h-[100px]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Payment Information Section */}
                    <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
                        <div className="flex items-center gap-2 mb-6">
                            <CreditCard className="w-5 h-5 text-primary" />
                            <h2 className="text-lg font-semibold text-foreground">
                                Información de pago (solo de ejemplo)
                            </h2>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <Label
                                    htmlFor="cardNumber"
                                    className="text-foreground"
                                >
                                    Número de tarjeta *
                                </Label>
                                <Input
                                    id="cardNumber"
                                    type="text"
                                    placeholder="1234 5678 9012 3456"
                                    value={formData.cardNumber}
                                    disabled={true}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            cardNumber: e.target.value,
                                        })
                                    }
                                    required
                                    className="mt-1.5"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label
                                        htmlFor="expiry"
                                        className="text-foreground"
                                    >
                                        Vencimiento *
                                    </Label>
                                    <Input
                                        id="expiry"
                                        type="text"
                                        placeholder="MM/AA"
                                        value={formData.expiry}
                                        disabled={true}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                expiry: e.target.value,
                                            })
                                        }
                                        required
                                        className="mt-1.5"
                                    />
                                </div>
                                <div>
                                    <Label
                                        htmlFor="cvv"
                                        className="text-foreground"
                                    >
                                        CVV *
                                    </Label>
                                    <Input
                                        id="cvv"
                                        type="text"
                                        placeholder="123"
                                        value={formData.cvv}
                                        disabled={true}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                cvv: e.target.value,
                                            })
                                        }
                                        required
                                        className="mt-1.5"
                                    />
                                </div>
                            </div>

                            <div>
                                <Label
                                    htmlFor="cardholderName"
                                    className="text-foreground"
                                >
                                    Nombre de la tarjeta *
                                </Label>
                                <Input
                                    id="cardholderName"
                                    type="text"
                                    placeholder="Juan Pérez"
                                    value={formData.cardholderName}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            cardholderName: e.target.value,
                                        })
                                    }
                                    required
                                    className="mt-1.5"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 justify-end">
                        <Button
                            type="button"
                            variant="outline"
                            className="order-2 sm:order-1"
                        >
                            Cancelar
                        </Button>
                        <Button type="submit" className="order-1 sm:order-2">
                            Confirmar reserva
                        </Button>
                    </div>

                    {/* Reservation Summary */}
                    <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
                        <h2 className="text-lg font-semibold text-foreground mb-4">
                            Resumen de reserva
                        </h2>
                        <div className="flex items-center gap-4">
                            <img
                                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=100&h=100&fit=crop"
                                alt="Cocina Industrial Sur"
                                className="w-16 h-16 rounded-lg object-cover"
                            />
                            <div>
                                <h3 className="font-semibold text-foreground">
                                    Cocina Industrial Sur
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Ciudad Jardin, Santiago de Cali
                                </p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReservationForm;
