const TodoEditModal = ({ route, navigation }) => {
    const { todo } = route.params;
    const { toggleTodo, deleteTodo, updateTodo } = useTodoContext();
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(todo.title);
    const [editedNote, setEditedNote] = useState(todo.note || '');
    const [editedCategory, setEditedCategory] = useState(todo.category || 'other');
    const [editedPriority, setEditedPriority] = useState(todo.priority || 'medium');

    useEffect(() => {
        setEditedTitle(todo.title);
        setEditedNote(todo.note || '');
        setEditedCategory(todo.category || 'other');
        setEditedPriority(todo.priority || 'medium');
    }, [todo.title, todo.note]);

    const handleToggle = async () => {
        await toggleTodo(todo.id);
        navigation.goBack()
    };

    const handleDelete = () => {
        Alert.alert(
            'Delete Todo',
            'Are you sure you want to delete this todo?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        const result = await deleteTodo(todo.id);
                        if (result.includes('Successfully')) {
                            navigation.goBack();
                        }
                        Alert.alert('Info', result);
                    },
                },
            ]
        );
    };

    const handleSave = async () => {
        const result = await updateTodo(todo.id, {
            title: editedTitle,
            note: editedNote,
            category: editedCategory,
            priority: editedPriority,
        });

        if (result.includes('Successfully')) {
            setIsEditing(false);

            navigation.setParams({
                todo: {
                    ...todo,
                    title: editedTitle,
                    note: editedNote,
                    category: editedCategory,
                    priority: editedPriority
                }
            });
        }
        Alert.alert('Info', result);
    };

    const handleCancel = () => {
        setEditedTitle(todo.title);
        setEditedNote(todo.note || '');
        setIsEditing(false);
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleToggle} style={styles.checkButton}>
                    <MaterialCommunityIcons
                        name={todo.completed ? "check-circle" : "circle-outline"}
                        size={32}
                        color={todo.completed ? "green" : "gray"}
                    />
                </TouchableOpacity>

                <View style={styles.headerActions}>
                    <TouchableOpacity
                        onPress={() => setIsEditing(!isEditing)}
                        style={styles.actionButton}
                    >
                        <MaterialCommunityIcons
                            name={isEditing ? "close" : "pencil"}
                            size={24}
                            color="blue"
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handleDelete}
                        style={styles.actionButton}
                    >
                        <MaterialCommunityIcons
                            name="delete"
                            size={24}
                            color="red"
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.content}>
                {isEditing ? (
                    <>
                        <TextInput
                            style={styles.titleInput}
                            value={editedTitle}
                            onChangeText={setEditedTitle}
                            placeholder="Todo title"
                            multiline
                        />

                        <TextInput
                            style={styles.noteInput}
                            value={editedNote}
                            onChangeText={setEditedNote}
                            placeholder="Add a note..."
                            multiline
                            textAlignVertical="top"
                        />

                        <View style={styles.selectorContainer}>
                            <Text style={styles.sectionTitle}>Category</Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsContainer}>
                                {Object.values(CATEGORIES).map((cat) => (
                                    <TouchableOpacity
                                        key={cat.id}
                                        style={[
                                            styles.chip,
                                            editedCategory === cat.id && { backgroundColor: cat.color, borderColor: cat.color }
                                        ]}
                                        onPress={() => setEditedCategory(cat.id)}
                                    >
                                        <MaterialCommunityIcons
                                            name={cat.icon}
                                            size={16}
                                            color={editedCategory === cat.id ? 'white' : '#666'}
                                            style={{ marginRight: 5 }}
                                        />
                                        <Text style={[
                                            styles.chipText,
                                            editedCategory === cat.id && { color: 'white' }
                                        ]}>
                                            {cat.label}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>

                        <View style={styles.selectorContainer}>
                            <Text style={styles.sectionTitle}>Priority</Text>
                            <View style={styles.chipsRow}>
                                {Object.values(PRIORITIES).map((prio) => (
                                    <TouchableOpacity
                                        key={prio.id}
                                        style={[
                                            styles.chip,
                                            editedPriority === prio.id && { backgroundColor: prio.color, borderColor: prio.color }
                                        ]}
                                        onPress={() => setEditedPriority(prio.id)}
                                    >
                                        <Text style={[
                                            styles.chipText,
                                            editedPriority === prio.id && { color: 'white' }
                                        ]}>
                                            {prio.label}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        <View style={styles.editActions}>
                            <TouchableOpacity
                                onPress={handleCancel}
                                style={[styles.editButton, styles.cancelButton]}
                            >
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={handleSave}
                                style={[styles.editButton, styles.saveButton]}
                            >
                                <Text style={styles.saveButtonText}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                ) : (
                    <>
                        <Text
                            style={[
                                styles.title,
                                todo.completed && styles.completedText,
                            ]}
                        >
                            {todo.title}
                        </Text>

                        {todo.note && (
                            <Text style={styles.note}>{todo.note}</Text>
                        )}
                    </>
                )}

                <View style={styles.metadata}>
                    <View style={styles.metadataItem}>
                        <MaterialCommunityIcons name="calendar" size={20} color="#666" />
                        <Text style={styles.metadataText}>{todo.time}</Text>
                    </View>

                    <View style={styles.metadataItem}>
                        <MaterialCommunityIcons
                            name={todo.completed ? "check" : "clock"}
                            size={20}
                            color={todo.completed ? "green" : "orange"}
                        />
                        <Text style={styles.metadataText}>
                            {todo.completed ? 'Completed' : 'Pending'}
                        </Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    checkButton: {
        padding: 5,
    },
    headerActions: {
        flexDirection: 'row',
    },
    actionButton: {
        marginLeft: 15,
        padding: 5,
    },
    content: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        lineHeight: 30,
    },
    completedText: {
        textDecorationLine: 'line-through',
        color: 'gray',
    },
    note: {
        fontSize: 16,
        lineHeight: 22,
        color: '#333',
        marginBottom: 20,
    },
    titleInput: {
        fontSize: 24,
        fontWeight: 'bold',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 15,
        marginBottom: 15,
        minHeight: 60,
    },
    noteInput: {
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 15,
        marginBottom: 20,
        minHeight: 120,
    },
    editActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    editButton: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#f8f9fa',
        borderWidth: 1,
        borderColor: '#ddd',
        marginRight: 10,
    },
    saveButton: {
        backgroundColor: '#007bff',
        marginLeft: 10,
    },
    cancelButtonText: {
        color: '#666',
        fontSize: 16,
        fontWeight: '600',
    },
    saveButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    metadata: {
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingTop: 15,
    },
    metadataItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    metadataText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#666',
    },
    selectorContainer: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10,
        color: '#333',
    },
    chipsContainer: {
        flexDirection: 'row',
    },
    chipsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    chip: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#ddd',
        marginRight: 10,
        marginBottom: 10,
        backgroundColor: 'white',
    },
    chipText: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },
});

export default TodoEditModal;