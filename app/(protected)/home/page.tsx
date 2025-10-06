"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { de, ro } from "date-fns/locale"
import { format } from "date-fns"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuthCheck } from "@/hooks/useAuthCheck"
import { useRouter } from "next/navigation"
import { logout } from "@/actions/logout"

type Event = {
  id: string
  deadline: string
  description: string
  eventdate: string
  eventdatetimefrom: string
  eventdatetimeto: string
  eventyear: string
  eventtype: string
  options: string[]
}

const HomePage = () => {
  const [name, setName] = useState("")
  const [type, setType] = useState("seminar")
  const [startDate, setStartDate] = useState<Date | undefined>()
  const [startTime, setStartTime] = useState("")
  const [endDate, setEndDate] = useState<Date | undefined>()
  const [endTime, setEndTime] = useState("")
  const [deadline, setDeadline] = useState<Date | undefined>()
  const [deadlineTime, setDeadlineTime] = useState("")
  const [options, setOptions] = useState<string[]>([])
  const [newOption, setNewOption] = useState("")
  const [events, setEvents] = useState<Event[]>([])

  const isAuthenticated = useAuthCheck()

  const router = useRouter()

  // --- Events laden ---
  useEffect(() => {
    if (isAuthenticated) {
      loadEvents()
    }
  }, [isAuthenticated])

  const resetFormular = () => {
    setName("")
    setStartDate(undefined)
    setStartTime("")
    setEndDate(undefined)
    setEndTime("")
    setDeadline(undefined)
    setDeadlineTime("")
    setNewOption("")
    setOptions([])
  }

  const loadEvents = async () => {
    try {
      const url = "/api/events"
      const response = await fetch(url, { method: "GET" })
      const result = await response.json()

      if (result && result.error) {
        throw new Error(result.error)
      }

      setEvents(result)
    } catch (err) {
      console.error("Fehler beim Laden der Events:", err)
      return []
    }
  }

  // --- Optionen ---
  const handleAddOption = () => {
    const trimmed = newOption.trim()
    if (trimmed && !options.includes(trimmed)) {
      setOptions([...options, trimmed])
      setNewOption("")
    }
  }

  const handleRemoveOption = (option: string) => {
    setOptions(options.filter((o) => o !== option))
  }

  // --- Event hinzufügen ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const url = "/api/events"
    const payload = {
      description: name,
      eventtype: type,
      eventdate: startDate?.toISOString().split("T")[0] || "",
      eventdatetimefrom: `${startDate?.toISOString().split("T")[0]}T${startTime}`,
      eventdatetimeto: `${endDate?.toISOString().split("T")[0]}T${endTime}`,
      deadline: `${deadline?.toISOString().split("T")[0]}T${deadlineTime}`,
      options: options,
    }

    try {
      const response = await fetch(url, { method: "POST", body: JSON.stringify(payload) })

      const createdEvent = await response.json()

      if (createdEvent && createdEvent.error) {
        throw new Error(createdEvent.error)
      }

      setEvents((prev) => [...prev, createdEvent as Event])

      resetFormular()
    } catch (err) {
      console.error("Fehler beim Erstellen des Events:", err)
    }
  }

  // --- Event löschen ---
  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/events/${id}`, { method: "DELETE" })
      setEvents((prev) => prev.filter((e) => e.id !== id))
    } catch (err) {
      console.error("Fehler beim Löschen:", err)
    }
  }

  return (
    <div className="max-w-5xl mx-auto space-y-10 p-4">
      <h1 className="text-3xl font-bold text-primary mb-6">Events verwalten</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Formular */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Eventname */}
          <div className="space-y-2">
            <Label htmlFor="name">Eventname</Label>
            <Input
              id="name"
              placeholder="z. B. Sommerfest 2025"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Event-Typ */}
          <div className="space-y-2">
            <Label htmlFor="type">Event-Typ</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger id="type">
                <SelectValue placeholder="Typ wählen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="seminar">Seminar</SelectItem>
                {/* <SelectItem value="training">Training</SelectItem> */}
                <SelectItem value="other">Sonstige Veranstaltung</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Zeitraum */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Startdatum</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !startDate && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "dd.MM.yyyy", { locale: de }) : "Datum wählen"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="p-0">
                  <Calendar mode="single" selected={startDate} onSelect={setStartDate} locale={de} />
                </PopoverContent>
              </Popover>
              <Input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label>Enddatum</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !endDate && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "dd.MM.yyyy", { locale: de }) : "Datum wählen"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="p-0">
                  <Calendar mode="single" selected={endDate} onSelect={setEndDate} locale={de} />
                </PopoverContent>
              </Popover>
              <Input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
            </div>
          </div>

          {/* Optionen */}
          <div className="space-y-2">
            <Label>Optionen</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Option hinzufügen (z. B. bleibe zum Essen, etc.)"
                value={newOption}
                onChange={(e) => setNewOption(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    handleAddOption()
                  }
                }}
              />
              <Button type="button" variant="secondary" onClick={handleAddOption}>
                +
              </Button>
            </div>

            {options.length > 0 && (
              <ul className="mt-2 space-y-1">
                {options.map((option) => (
                  <li key={option} className="flex items-center justify-between bg-muted ps-3 rounded-md">
                    <span>{option}</span>
                    <Button type="button" variant="ghost" size="icon" onClick={() => handleRemoveOption(option)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Anmeldeschluss */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Anmeldeschluss</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !deadline && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {deadline ? format(deadline, "dd.MM.yyyy", { locale: de }) : "Datum wählen"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="p-0">
                  <Calendar mode="single" selected={deadline} onSelect={setDeadline} locale={de} />
                </PopoverContent>
              </Popover>
              <Input type="time" value={deadlineTime} onChange={(e) => setDeadlineTime(e.target.value)} />
            </div>
          </div>

          <Button type="submit" className="w-full">
            Event anlegen
          </Button>
        </form>

        {/* Eventliste */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Erstellte Events</h2>
          {events.length === 0 && <p className="text-muted-foreground">Noch keine Events vorhanden.</p>}

          <ul className="space-y-3">
            {events.map((event) => (
              <li key={event.id} className="border rounded-lg p-3 flex justify-between items-start bg-card">
                <div className="space-y-1">
                  <p className="font-semibold">{event.description}</p>
                  <p className="text-sm text-muted-foreground">
                    {event.eventtype} – {format(new Date(event.eventdatetimefrom), "dd.MM.yyyy HH:mm", { locale: de })}{" "}
                    bis {format(new Date(event.eventdatetimeto), "dd.MM.yyyy HH:mm", { locale: de })}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Anmeldeschluss:{" "}
                    {event.deadline ? format(new Date(event.deadline), "dd.MM.yyyy HH:mm", { locale: de }) : "-"}
                  </p>

                  {/* 🧩 Optionen */}
                  {event.options && event.options.length > 0 && (
                    <div className="mt-2">
                      <p className="text-xs font-semibold text-muted-foreground">Optionen:</p>
                      <ul className="ml-3 list-disc text-xs text-muted-foreground">
                        {event.options.map((opt: any) => (
                          <li key={opt.id}>{opt.description}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <Button type="button" variant="ghost" size="icon" onClick={() => handleDelete(event.id)}>
                  <X className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default HomePage
